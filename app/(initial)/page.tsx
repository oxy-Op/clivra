import { initialProfile } from "@/lib/initial-profile";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const IsLogged = async () => {
  const me = await currentUser();

  if (!me) {
    return redirectToSignIn();
  }

  return redirect("/landing");
};

export default IsLogged;
