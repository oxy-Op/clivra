import { initialProfile } from "@/lib/initial-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const IsLogged = async () => {
  const profile = await initialProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  redirect("/chat");
};

export default IsLogged;
