import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function NavBar() {
  return (
    <nav className="mb-4 flex w-full items-center justify-between border-b p-4 font-semibold">
      <div className="text-xl text-white">Gallery</div>
      <button className="rounded-md border-2 border-white p-2 font-semibold text-white">
        Sign In
      </button>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
