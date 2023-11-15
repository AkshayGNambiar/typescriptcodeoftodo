import * as jwt from 'jsonwebtoken';

// Rest of your TypeScript code here

import {Request, Response,NextFunction } from 'express';

// Rest of your TypeScript code here

const SECRET: string = 'SECr3t';
interface User {
  id: string;
  // Add any other properties your user object might have
}
// This should be in an environment variable in a real application
interface CustomRequest extends Request {
  userId?: string;
}

const authenticateJwt = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader: string | undefined = req.headers.authorization;



  if (authHeader) {
    const token: string = authHeader.split(' ')[1];

    jwt.verify(token, SECRET, (err: jwt.VerifyErrors | null, user: User) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userId = user.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};




export { authenticateJwt,SECRET } ;
