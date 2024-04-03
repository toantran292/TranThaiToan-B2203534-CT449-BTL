declare global {
  namespace Express {
    interface Request<T = any> {
      data: T;
    }
  }
}
export default global;
