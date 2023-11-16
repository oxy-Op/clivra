import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const IsLogged = () => {
  const user = currentUser();

  if (!user) {
    redirectToSignIn();
  }

  return redirect("/chats");
};

export default IsLogged;
