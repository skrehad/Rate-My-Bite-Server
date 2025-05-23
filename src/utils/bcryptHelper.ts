import bcrypt from "bcrypt";
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const bcryptHelper = {
  hashPassword,
  comparePassword,
};
