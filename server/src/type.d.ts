import { AuthPayload } from "@auth/interfaces/auth.interface";

declare global {
  namespace Express {
    interface Request<T = any> {
      data: T;
      user?: AuthPayload;
    }
  }
}
export default global;
