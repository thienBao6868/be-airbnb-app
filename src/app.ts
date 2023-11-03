require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import indexRouter from './routes/index';
import { AppError, NotFound, SuccessResponse } from './helpers/utils';
import { HttpCode } from './utils/httpCode';

class App {
  public app: express.Application;
  private allowlist = ['http://localhost:5000/', 'http://localhost:3000'];
  constructor() {
    this.app = express();
    this.config();
    this.routerSetup();
  }

  private config() {
    this.app.use(helmet());
    this.app.use(cors({ origin: this.allowlist }));
    this.app.use(compression());
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, 'public')));
    require('./database/init.mongodb');
  }

  private routerSetup() {
    //
    this.app.use('/', indexRouter);
    //   handle error Not match router
    this.app.use((_req, _res, next) => {
      const err = new NotFound('Not Found Url');
      next(err);
    });

    /* Initialize Error Handling */
    this.app.use(
      (
        err: AppError,
        _req: Request,
        _res: Response,
        _next: NextFunction,
      ): void => {
        console.log('ERROR', err);
        new SuccessResponse({
          success: false,
          statusCode: err.httpCode
            ? err.httpCode
            : HttpCode.INTERNAL_SERVER_ERROR,
          errors: { message: err.message },
          message: err.isOperational ? err.errorType : 'Internal Server Error',
        }).send(_res);
      },
    );
  }
}

export default new App().app;
