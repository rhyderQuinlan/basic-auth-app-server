import { Error } from './errors'

export class Response {
  data: any
  status: number
  error: Error | null
}

export enum TokenStatus {
  INVALID,
  EXPIRED,
  OK
}
