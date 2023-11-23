import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();

  const users = await db.user.findMany({
    where: {
      NOT: {
        email: user?.emailAddresses[0].emailAddress,
      },
    },
  });

  return NextResponse.json({
    users: users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        image: user.image,
      };
    }),
  });
}
