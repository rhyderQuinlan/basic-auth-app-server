import { logger } from '../logger'
import { getConnection as db } from 'typeorm'
import { User } from '../entity/user'
import { Role } from '../entity/role'
import HttpStatus = require('http-status-codes')
import bcrypt = require('bcrypt')
import jwt = require('jsonwebtoken')
import { Response, TokenStatus } from '../models/response'
import { Errors } from '../models/errors'

class JwtToken {
  accessToken: string
  refreshToken: string
}

export async function authenticate (email: string, password: string): Promise<Response> {
  try {
    const user: User | undefined = await db().manager.findOne(User, { email })
    if (user === undefined) {
      logger.warn('Failed authentication attempt. Username: {username}. Reason: {reason}', {
        reason: 'User does not exist matching given username',
        email
      })
      return { data: null, status: HttpStatus.StatusCodes.FORBIDDEN, error: Errors.UNKNOWN_USERNAME }
    }
    return bcrypt.compare(password, user.password).then(function (result: String) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!result) {
        logger.warn('Failed authentication attempt. Username: {username}. Reason: {reason}', {
          reason: 'Incorrect password for given username',
          email
        })
        return { data: null, status: HttpStatus.StatusCodes.FORBIDDEN, error: Errors.INCORRECT_PASSWORD }
      }
      logger.info('User authenticated. Id: {id}, Username: {username}.', {
        id: user.id,
        email
      })
      const token: JwtToken = {
        accessToken: jwt.sign({ email, user_id: user.id }, process.env.ACCESS_SECRET, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME
        }),
        refreshToken: jwt.sign({ email, user_id: user.id }, process.env.REFRESH_SECRET, {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME
        })
      }
      return { data: token, status: HttpStatus.StatusCodes.OK }
    })
  } catch (error) {
    logger.error(error)
    return { data: null, status: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, error: Errors.INTERNAL_SERVER_ERROR }
  }
}

export async function validateClientToken (token: JwtToken): Promise<Response> {
  return jwt.verify(token.accessToken, process.env.ACCESS_SECRET, (error, decoded) => {
    if (error) {
      if (error.name === 'TokenExpiredError') {
        return refresh(token.refreshToken)
      }
    }
    return { data: token, status: HttpStatus.StatusCodes.OK, error: null }
  })
}

export async function refresh (refreshToken: string): Promise<Response> {
  try {
    return jwt.verify(refreshToken, process.env.REFRESH_SECRET, (error, decoded) => {
      if (error) {
        logger.error(error)
        if (error.name === 'TokenExpiredError') {
          return { data: null, status: HttpStatus.StatusCodes.UNAUTHORIZED, error: Errors.REFRESH_TOKEN_EXPIRED }
        } else {
          return { data: null, status: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, error: Errors.INTERNAL_SERVER_ERROR }
        }
      }
      const token: JwtToken = {
        accessToken: jwt.sign({
          email: decoded.email,
          user_id: decoded.user_id
        }, process.env.ACCESS_SECRET, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME
        }),
        refreshToken
      }
      logger.info('Refreshing token. Username: {email}', { email: decoded.email })
      return { data: token, status: HttpStatus.StatusCodes.OK }
    })
  } catch (error) {
    logger.error(error)
    return { data: null, status: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, error: Errors.INTERNAL_SERVER_ERROR }
  }
}

export async function register (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string): Promise<Response> {
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)
  const user = new User()
  user.email = email
  user.password = passwordHash
  user.firstName = firstName
  user.lastName = lastName
  user.phoneNumber = phoneNumber
  return await db().manager
    .save(user)
    .then(user => {
      logger.info('New user registered. Id: {id}, Username: {username}.', {
        id: user.id,
        email
      })
      return { data: null, status: HttpStatus.StatusCodes.OK, error: null }
    })
    .catch(error => {
      logger.error(error)
      return { data: null, status: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, error: Errors.INTERNAL_SERVER_ERROR }
    })
}

export async function me (token: string, email: string): Promise<Response> {
  try {
    if (await validateToken(token) !== TokenStatus.OK) {
      return {
        data: null,
        status: HttpStatus.StatusCodes.PRECONDITION_FAILED,
        error: Errors.ACCESS_TOKEN_EXPIRED
      }
    }
    return await db().manager.findOneOrFail(User, { email }).then(user => {
      logger.info('User fetched. Id: {id}', {
        id: user.id
      })
      return { data: user, status: HttpStatus.StatusCodes.OK, error: null }
    })
  } catch (error) {
    logger.error(error)
    return { data: null, status: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, error: Errors.INTERNAL_SERVER_ERROR }
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

async function validateToken (token: string): Promise<TokenStatus> {
  const t = token.split(' ')
  if (t[0] !== 'Bearer') return TokenStatus.INVALID
  return jwt.verify(t[1], process.env.ACCESS_SECRET, (error, decoded) => {
    if (error.name === 'TokenExpiredError') {
      return TokenStatus.EXPIRED
    } else if (error) {
      logger.error(error)
    } else {
      return TokenStatus.OK
    }
  })
}
