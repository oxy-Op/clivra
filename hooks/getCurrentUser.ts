import { initialProfile } from "@/lib/initial-profile";
import { currentUser, redirectToSignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function getCurrentUser() {
  const me = await currentUser();

  if (!me) {
    redirectToSignUp();
  }

  const profile = await initialProfile();

  if (!profile) {
    return redirect("/");
  }

  return profile;
}

export default getCurrentUser;
