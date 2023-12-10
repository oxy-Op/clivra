import getCurrentUser from "@/hooks/getCurrentUser";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const currentUser = await getCurrentUser();
//     const { searchParams } = new URL(req.url);
//     const conversationId = searchParams.get("conversationId");

//     if (!currentUser?.id || !currentUser.email) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const messages = await db.message.findMany({
//       where: {
//         conversationId: conversationId as string,
//       },
//       include: {
//         sender: true,
//         seen: true,
//       },
//       orderBy: {
//         createdAt: "asc",
//       },
//     });

//     return NextResponse.json(messages);
//   } catch (error: any) {
//     return [];
//   }
// }

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

    const updatedConversation = await db.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: message.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    await pusherServer.trigger(conversationId, "messages:new", message);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    return NextResponse.json(message);
  } catch (error) {
    console.log("[MESSAGE ERROR] ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
