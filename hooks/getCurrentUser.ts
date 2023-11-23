import { db } from "@/lib/db";
import { currentUser, redirectToSignUp } from "@clerk/nextjs";


async function getCurrentUser() {
    const me = await currentUser();

    if (!me){
        redirectToSignUp()
    }

    const user = await db.user.findUnique({
        where: {
            email: me?.emailAddresses[0].emailAddress
        }
    })

    if (!user){
        return null;
    }

    return user
}
 
export default getCurrentUser;