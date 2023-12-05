import { initialProfile } from "@/lib/initial-profile";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const IsLogged = async () => {
  const me = await currentUser();

  if (!me) {
    return redirectToSignIn();
  }

  const profile = await initialProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (profile) {
    redirect("/chat");
  }
};

export default IsLogged;
