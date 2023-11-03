//import { BadRequest, CreateResponse } from '@/helpers/utils';
import User from '@/models/User';
import { CreateUserSchema } from '@/schema/user.schema';
//import UserService from '@/services/user.service';
//import { getFilterData } from '@/utils/lodashUtil';

import { Request, Response } from 'express';

class UserController {
  createUser = async (
    req: Request<any, any, CreateUserSchema>,
    res: Response,
  ) => {
    const { email } = req.body;

    // const userDb = await UserService.findOneUser({ email });
    // if (userDb) throw new BadRequest('User exit');
    // const newUser = await UserService.createUser(req.body);

    // new CreateResponse({
    //   message: 'create user successfully',
    //   data: {newUser},
    // }).send(res);
    const newUser = await User.create(req.body);
    res.send(newUser);
  };
}

const userController = new UserController();
export default userController;
