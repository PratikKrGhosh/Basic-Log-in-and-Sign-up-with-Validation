import { createUser, getUserByUserName } from "../services/user.service.js";
import { hashPassword, verifyHash } from "../utils/hash.js";
import { signToken } from "../utils/token.js";
import { logInSchema, signUpSchema } from "../validator/auth.validate.js";

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

    const { data, error } = signUpSchema.safeParse(req.body);

    if (error) {
      req.flash("errors", error.errors[0].message);
      return res.redirect("/signup");
    }
    const { name, userName, email, password } = data;
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

    const { data, error } = logInSchema.safeParse(req.body);

    if (error) {
      req.flash("errors", error.errors[0].message);
      return res.redirect("/login");
    }
    const { userName, password } = data;

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

    const tokenData = {
      name: userData.name,
      userName: userData.userName,
      email: userData.email,
    };
    const token = await signToken(tokenData);
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
