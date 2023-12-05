import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs";

const f = createUploadthing();

const handle = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return { user_id: userId };
};

export const ourFileRouter = {
  messageFile: f(["image"])
    .middleware(() => handle())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
