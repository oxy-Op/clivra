import { User } from "@/lib/types";
import { NextResponse } from "next/server";
import { Clerk } from "@clerk/backend";

const clerk = Clerk({
secretKey: process.env.CLERK_SECRET_KEY,
});

export async function GET() {
    const users = (await clerk.users.getUserList({}))

    return NextResponse.json(
        users.map(({id, firstName, lastName, username, imageUrl}: User) => {
            return {
                id,
                firstName,
                lastName: lastName || "",
                username,
                imageUrl
            }
        })
    );

}
    