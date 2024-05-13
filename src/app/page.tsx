import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  console.log(images);
  return (
    <main>
      <div className="grid grid-cols-4 place-items-center gap-4">
        {[...images, ...images, ...images].map((image, index) => (
          <div key={image.id + "-" + index}>
            <img
              className="rounded-md  border-2 border-white"
              src={image.url}
            />
            <span className="text-white">{image.name}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
