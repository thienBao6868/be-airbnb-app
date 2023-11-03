import User, { UserDocument, UserType } from '@/models/User';
import { AnyKeys, FilterQuery, QueryOptions } from 'mongoose';

class UserService {
  static findOneUser = async (
    query: FilterQuery<UserDocument>,
    option?: QueryOptions,
  ) => {
    return await User.findOne(query, null, { lean: true, ...option }).exec();
  };
  static createUser = async (newUser: AnyKeys<UserType>) => {
    return await User.create(newUser);
  };
}
export default UserService;
