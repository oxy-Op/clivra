import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

const getUsers = async () => {
  const me = await getCurrentUser();

  if (!me?.email) {
    return [];
  }

  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: me?.email,
        },
      },
    });

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
