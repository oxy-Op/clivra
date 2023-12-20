import LandingCard from "@/components/landing/card";
import { db } from "@/lib/db";
import { log } from "@/lib/utils";
import { currentUser, redirectToSignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const LandingPage = async () => {
  const me = await currentUser();

  if (!me) {
    return redirectToSignUp();
  }

  const profile = await db.user.findUnique({
    where: {
      email: me.emailAddresses[0].emailAddress,
    },
  });

  if (profile?.name) {
    log("[PROFILE_FOUND]", profile.name);
    return redirect("/chat");
  }

  if (!profile?.email) {
    const newProf = await db.user.create({
      data: {
        image: me.imageUrl,
        email: me.emailAddresses[0].emailAddress,
      },
    });
    log("[PROFILE_CREATED]", newProf);
  }

  return (
    <div className="flex flex-col min-w-[150px] min-h-full w-full h-full bg-[#1d1f1f]">
      <div className="mx-auto pt-40">
        <h1 className="text-3xl p-2">Welcome to Clivra</h1>
      </div>
      <LandingCard
        id={me.id}
        name={
          me?.firstName + " " + (me?.lastName !== null ? me?.lastName : "") ||
          me?.username ||
          ""
        }
      />
    </div>
  );
};

export default LandingPage;
