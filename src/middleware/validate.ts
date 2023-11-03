import { HttpCode } from '@/utils/httpCode';
import { ReasonPhrases } from '@/utils/reasonPhrases';
import { NextFunction, Request, Response } from 'express';
import { AnyObject } from 'yup';

export const catchError =
  (fun: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fun(req, res, next)).catch(next);

export const validateRequest =
  (schema: AnyObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      error.httpCode = HttpCode.BAD_REQUEST;
      error.errorType = ReasonPhrases.BAD_REQUEST;
      next(error);
    }
  };
