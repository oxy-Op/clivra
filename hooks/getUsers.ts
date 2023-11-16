import { Clerk } from "@clerk/backend";

const clerk = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const users = clerk.users.getUserList({})