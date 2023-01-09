/* eslint-disable import/first */
import express = require('express')
import * as bodyParser from 'body-parser'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv')
dotenv.config()

import * as config from './config'
import { addRole, authenticate, register, me } from './services/authentication'
import { logger } from './logger'

const app = express()

app.use(bodyParser.json())

void createConnection()

// authenticate user
app.post(config.ENDPOINT_POST_AUTHENTICATE, async (request, response) => {
  const username: string = request.body.username
  const password: string = request.body.password
  response.json(await authenticate(username, password))
})

// register user
app.post(config.ENDPOINT_POST_REGISTER, async (request, response) => {
  const username: string = request.body.username
  const password: string = request.body.password
  const firstname: string = request.body.firstname
  const lastname: string = request.body.lastname
  const email: string = request.body.email
  const phoneNumber: string = request.body.phoneNumber
  response.sendStatus(await register(username, password, firstname, lastname, email, phoneNumber))
})

// me
app.get(config.ENDPOINT_GET_ME, async (request, response) => {
  const username: string = request.body.username
  response.json(await me(username))
})

// add role
app.post(config.ENDPOINT_POST_ADD_ROLE, async (request, response) => {
  const name: string = request.body.name
  response.sendStatus(await addRole(name))
})

app.listen(process.env.HTTP_PORT, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  logger.info(`🚀 Listening on port ${process.env.HTTP_PORT}`)
})
