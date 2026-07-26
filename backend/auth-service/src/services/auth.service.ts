import ApiError from "../utils/apiError";
import * as userRepository from "../repositories/user.repository";
import { comparePassword } from "../utils/bcrypt";
import { generateAccessToken } from "../utils/jwt";

export const login = async (email: string, password: string) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user || !(await comparePassword(password, user.password))) {
    throw new ApiError(401, "Invalid email or password");
  }
  const { password: _password, ...safeUser } = user;
  return { user: safeUser, accessToken: generateAccessToken(user) };
};
