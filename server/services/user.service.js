import { eq } from "drizzle-orm";
import db from "../config/db.js";
import { usersTable } from "../drizzle/schema.js";

export const createUser = async ({ name, userName, email, password }) => {
  try {
    return await db
      .insert(usersTable)
      .values({ name, userName, email, password });
  } catch (err) {
    return null;
  }
};

export const getUserByUserName = async (userName) => {
  try {
    return await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.userName, userName));
  } catch (err) {
    return null;
  }
};
