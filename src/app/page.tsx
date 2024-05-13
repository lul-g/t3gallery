import Link from "next/link";
import { db } from "~/server/db";

export default async function HomePage() {
  const mockUrls = [
    "https://utfs.io/f/5999dc31-efac-4ed6-9e02-8a5a58bbe91c-p4ei8d.png",
    "https://utfs.io/f/3bae0fe1-f5f1-4e4b-8151-11f3b6521c50-palkka.png",
    "https://utfs.io/f/0b26615f-56cc-49a9-814a-fd661b4692b5-lmk6h3.png",
  ];
  const mockImages = mockUrls.map((url, i) => ({
    id: i + 1,
    url,
  }));

  const posts = await db.query.posts.findMany();
  console.log(posts);
  return (
    <main>
      <div className="grid grid-cols-4 place-items-center gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={image.id + "-" + index}>
            <img
              className="rounded-md  border-2 border-white"
              src={image.url}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
