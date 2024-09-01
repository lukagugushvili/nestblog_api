import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const URL = req.url;
    const timestamp = new Date().toISOString();

    console.log('METHOD =>', method, 'URL =>', URL, 'timestamp =>', [
      timestamp,
    ]);

    next();
  }
}
