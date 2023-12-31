import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
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

export async function PATCH(req: Request) {
  try {
    const me = await currentUser();
    const { name, image } = await req.json();

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

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: name,
        image: image,
      },
    });

    pusherServer.trigger(user.id, "user:update", updatedUser);
    console.log(
      "triggeed user:updated",
      "[prevName]: ",
      user.name,
      "[newName]: ",
      updatedUser.name
    );

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json([]);
  }
}
