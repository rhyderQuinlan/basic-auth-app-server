/* eslint-disable import/first */
import express = require('express')
import * as bodyParser from 'body-parser'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv')
dotenv.config()

import * as config from './config'
import { addRole, authenticate, register, me, refresh } from './services/authentication'
import { logger } from './logger'

const app = express()
app.use(bodyParser.json())

void createConnection()

// authenticate user
app.post(config.ENDPOINT_POST_AUTHENTICATE, async (request, response) => {
  const email: string = request.body.email
  const password: string = request.body.password
  response.json(await authenticate(email, password))
})

// refresh token
app.post(config.ENDPOINT_POST_REFRESH, async (request, response) => {
  const refreshToken = request.body.refresh_token
  response.json(await refresh(refreshToken))
})

// register user
app.post(config.ENDPOINT_POST_REGISTER, async (request, response) => {
  const email: string = request.body.email
  const password: string = request.body.password
  const firstname: string = request.body.firstname
  const lastname: string = request.body.lastname
  const phoneNumber: string = request.body.phoneNumber
  response.json(await register(email, password, firstname, lastname, phoneNumber))
})

// me
app.get(config.ENDPOINT_GET_ME, async (request, response) => {
  const email: string = request.body.email
  response.json(await me(request.headers.authorization, email))
})

// add role
app.post(config.ENDPOINT_POST_ADD_ROLE, async (request, response) => {
  const name: string = request.body.name
  response.json(await addRole(name))
})

const listener = app.listen(process.env.HTTP_PORT, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  logger.info(`🚀 Listening on ${listener.address().address}/${process.env.HTTP_PORT} 🚀`)
})
