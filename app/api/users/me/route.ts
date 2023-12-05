import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const me = await currentUser();

    if (!me) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: {
        email: me?.emailAddresses[0].emailAddress,
      },
    });

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json([]);
  }
}
