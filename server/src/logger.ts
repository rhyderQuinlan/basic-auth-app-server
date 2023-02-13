'use strict'
import winston = require('winston')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SeqTransport } = require('@datalust/winston-seq')

console.log(`📚 Attempting to connect to logger at http://host.docker.internal:${process.env.SEQ_PORT} 📚`)
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { platform: 'api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new SeqTransport({
      serverUrl: `http://host.docker.internal:${process.env.SEQ_PORT}`,
      apiKey: process.env.SEQ_KEY,
      onError: (e: string) => { console.error(e) },
      handleExceptions: true,
      handleRejections: true
    })
  ]
})
