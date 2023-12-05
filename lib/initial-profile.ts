import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  if (profile) {
    return profile;
  }

  const newProf = await db.user.create({
    data: {
      name:
        user.firstName + " " + (user.lastName === null ? "" : user.lastName) ||
        user.username,
      image: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProf;
};
