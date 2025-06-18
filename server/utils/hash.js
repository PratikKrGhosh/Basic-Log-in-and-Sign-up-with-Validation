import argon2 from "argon2";

export const hashPassword = (password) => {
  try {
    return argon2.hash(password);
  } catch (err) {
    return null;
  }
};

export const verifyHash = ({ password, hashedPassword }) => {
  try {
    return argon2.verify(hashedPassword, password);
  } catch (err) {
    return false;
  }
};
