import { logger } from '../logger'
import { getConnection as db } from 'typeorm'
import { User } from '../entity/user'
import { Role } from '../entity/role'
import HttpStatus = require('http-status-codes')
import bcrypt = require('bcrypt')
import jwt = require('jsonwebtoken')

export async function authenticate (username: string, password: string): Promise<{ token: string | null, status: number }> {
  try {
    let token = ''
    const user: User = await db().manager.findOneOrFail(User, { username })
    await bcrypt.compare(password, user.password).then(function (result: String) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (result) {
        logger.info('User authenticated. Id: {id}, Username: {username}.', {
          id: user.id,
          username
        })
        token = jwt.sign({ user_id: user.id }, 'secretsecretsecret')
      } else {
        throw new Error('Failed to authenticate user.')
      }
    })
    return { token, status: HttpStatus.StatusCodes.OK }
  } catch (error) {
    logger.error(error)
    return { token: null, status: HttpStatus.StatusCodes.OK }
  }
}

export async function register (
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string): Promise<{ status: number }> {
  try {
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    const user = new User()
    user.username = email
    user.password = passwordHash
    user.firstName = firstName
    user.lastName = lastName
    user.phoneNumber = phoneNumber
    void db().manager
      .save(user)
      .then(user => {
        logger.info('New user registered. Id: {id}, Username: {username}.', {
          id: user.id,
          username
        })
      })
    return { status: HttpStatus.StatusCodes.OK }
  } catch (error) {
    logger.error(error)
    return { status: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR }
  }
}

export async function me (username: string): Promise<{ data: User | null, status: number }> {
  try {
    return await db().manager.findOneOrFail(User, { username }).then(user => {
      logger.info('User fetched. Id: {id}', {
        id: user.id
      })
      return { data: user, status: HttpStatus.StatusCodes.OK }
    })
  } catch (error) {
    logger.error(error)
    return { data: null, status: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR }
  }
}

export async function addRole (name: string): Promise<{ status: number }> {
  try {
    const role: Role = new Role()
    role.name = name
    await db().manager.save(role)
    return { status: HttpStatus.StatusCodes.OK }
  } catch (error) {
    logger.error(error)
    return { status: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR }
  }
}
