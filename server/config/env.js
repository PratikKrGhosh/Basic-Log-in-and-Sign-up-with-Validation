import dotenv from "dotenv";
dotenv.config();

const config = {
  dev: {
    db: process.env.DB_URI,
    port: process.env.PORT || 3000,
    key: process.env.TOKEN_KEY || "abcde12345",
    tokenExp: process.env.TOKEN_EXPIRE || "1m",
    log: "bug",
  },
  test: {
    db: process.env.DB_URI,
    port: process.env.PORT || 3000,
    key: process.env.TOKEN_KEY || "abcde12345",
    tokenExp: process.env.TOKEN_EXPIRE || "1m",
    log: "info",
  },
  production: {
    db: process.env.DB_URI,
    port: process.env.PORT || 3000,
    key: process.env.TOKEN_KEY || "abcde12345",
    tokenExp: process.env.TOKEN_EXPIRE || "1m",
    log: "error",
  },
};

const stage = process.env.STAGE || "dev";

export default config[stage];
