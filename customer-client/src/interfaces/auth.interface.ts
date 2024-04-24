export interface IToken {
  accessToken: string
  refreshToken: string
}

export interface ILoginPayload {
  email: string
  password: string
}
