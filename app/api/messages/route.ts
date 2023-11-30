import getCurrentUser from "@/hooks/getCurrentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, image, conversationId } = await req.json();
    const currentUser = await getCurrentUser();

    if (!text && !image) {
      return NextResponse.json("Invalid data", { status: 400 });
    }

    if (!conversationId) {
      return NextResponse.json("Invalid data", { status: 400 });
    }

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const message = await db.message.create({
      data: {
        body: text,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.log("[MESSAGE ERROR] ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
