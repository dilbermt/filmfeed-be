
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export interface User {
  _id: string;
  username: string;
  email: string;
};
