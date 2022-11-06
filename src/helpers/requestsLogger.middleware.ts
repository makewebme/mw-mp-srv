import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'


@Injectable()
export class RequestsLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const { method, path: url } = req

    res.on('close', () => {
      const { statusCode } = res

      console.log({
        method,
        url,
        resStatusCode: statusCode,
        payload: JSON.stringify(method === 'GET' ? req.query : req.body, null, 4),
      })
    })

    next()
  }
}
