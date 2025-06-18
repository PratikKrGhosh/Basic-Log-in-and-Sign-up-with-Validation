import { createUser, getUserByUserName } from "../services/user.service.js";
import { hashPassword, verifyHash } from "../utils/hash.js";

export const getSignupPage = (req, res) => {
  try {
    return res.status(200).render("signup");
  } catch (err) {
    return res.status(404).send("Page Not Found");
  }
};

export const getLoginPage = (req, res) => {
  try {
    return res.status(200).render("login");
  } catch (err) {
    return res.status(404).send("Page Not Found");
  }
};

export const signup = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const [newUser] = await createUser({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    if (!newUser) return res.status(400).send("Couldn't Create User");

    return res.status(200).redirect("/login");
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const [userData] = await getUserByUserName(userName);

    console.log(userData);

    if (!userData) return res.status(404).send("User Does not Exist");

    const verifyPassword = await verifyHash({
      password,
      hashedPassword: userData.password,
    });

    if (!verifyPassword) return res.status(400).json({ password: "wrong" });

    return res.status(200).redirect("/");
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};

export const logout = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};
