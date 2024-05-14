import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { functionToStringIntegration } from "@sentry/nextjs";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");
  return await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
    where: (model, { eq }) => eq(model.userID, user.userId),
  });
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");
  if (image.userID !== user.userId) throw new Error("Unauthorized");

  return image;
}
