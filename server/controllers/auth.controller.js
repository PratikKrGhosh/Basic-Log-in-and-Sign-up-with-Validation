import { createUser, getUserByUserName } from "../services/user.service.js";
import { hashPassword, verifyHash } from "../utils/hash.js";
import { signToken } from "../utils/token.js";

export const getSignupPage = (req, res) => {
  try {
    if (req.user) return res.redirect("/");
    return res.status(200).render("signup", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page Not Found");
  }
};

export const getLoginPage = (req, res) => {
  try {
    if (req.user) return res.redirect("/");

    return res.status(200).render("login", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page Not Found");
  }
};

export const signup = async (req, res) => {
  try {
    if (req.user) return res.redirect("/");

    const { name, userName, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const [newUser] = await createUser({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      req.flash("errors", "Couldn't Create User");
      return res.status(400).redirect("/signup");
    }

    return res.status(200).redirect("/login");
  } catch (err) {
    req.flash("errors", "Something Went Wrong");
    return res.status(400).redirect("/signup");
  }
};

export const login = async (req, res) => {
  try {
    if (req.user) return res.redirect("/");

    const { userName, password } = req.body;

    const [userData] = await getUserByUserName(userName);

    console.log(userData);

    if (!userData) {
      req.flash("errors", "Incorrect User name or Password");
      return res.status(400).redirect("/login");
    }

    const verifyPassword = await verifyHash({
      password,
      hashedPassword: userData.password,
    });

    if (!verifyPassword) {
      req.flash("errors", "Incorrect User name or Password");
      return res.status(400).redirect("/login");
    }

    const data = {
      name: userData.name,
      userName: userData.userName,
      email: userData.email,
    };
    const token = await signToken(data);
    res.cookie("access_token", token);

    return res.status(200).redirect("/");
  } catch (err) {
    req.flash("errors", "Something Went Wrong");
    return res.status(400).redirect("/login");
  }
};

export const logout = async (req, res) => {
  try {
    if (!req.user) return res.redirect("/");

    res.clearCookie("access_token");
    return res.redirect("/login");
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};
