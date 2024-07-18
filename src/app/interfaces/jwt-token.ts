export interface IJWTToken {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  createdAt: Date;
}
