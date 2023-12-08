import getCurrentUser from "@/hooks/getCurrentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const me = await getCurrentUser();
    const { userId, isGroup, name, members } = await request.json();

    if (!me?.id || !me?.email) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const groupConversation = await db.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: me.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(groupConversation);
    }

    const existingConversations = await db.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [me.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, me.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    // creating conversation

    const newConversation = await db.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: me?.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
