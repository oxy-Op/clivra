import { db } from "@/lib/db";
import { log } from "@/lib/utils";
import { currentUser, redirectToSignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function getCurrentUser() {
  const user = await currentUser();

  if (!user) {
    redirectToSignUp();
  }

  const profile = await db.user.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress,
    },
  });

  if (profile) {
    log("[PROFILE_FOUND_CURRENT]", profile.name);
    return profile;
  }

  redirect("/");
}

export default getCurrentUser;
