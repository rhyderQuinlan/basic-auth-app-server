export class Error {
  code: string
  message: string
}

export enum ErrorCodes {
  ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_EXPIRED',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  UNKOWN_USERNAME = 'UNKOWN_USERNAME',
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Errors {
  static INTERNAL_SERVER_ERROR: Error = {
    code: ErrorCodes.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error occured.'
  }

  static ACCESS_TOKEN_EXPIRED: Error = {
    code: ErrorCodes.ACCESS_TOKEN_EXPIRED,
    message: 'JWT Access Token expired.'
  }

  static REFRESH_TOKEN_EXPIRED: Error = {
    code: ErrorCodes.REFRESH_TOKEN_EXPIRED,
    message: 'JWT Refresh Token expired.'
  }

  static UNKNOWN_USERNAME: Error = {
    code: ErrorCodes.UNKOWN_USERNAME,
    message: 'User does not exist.'
  }

  static INCORRECT_PASSWORD: Error = {
    code: ErrorCodes.INCORRECT_PASSWORD,
    message: 'Incorrect password.'
  }
}
