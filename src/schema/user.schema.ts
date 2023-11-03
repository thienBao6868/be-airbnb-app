import { URL_REGEX } from '@/utils/regexUrl';
import * as Yup from 'yup';

const passWordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
export const createUserSchema = Yup.object().shape({
  body: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().matches(
      passWordRegExp,
      'Password contain at least one numeric digit, one uppercase and one lowercase letter',
    ).required(),
    avatar: Yup.string().matches(URL_REGEX,'Must be url').notRequired(),
  }),
});
export type CreateUserSchema = Yup.InferType<typeof createUserSchema>['body'];