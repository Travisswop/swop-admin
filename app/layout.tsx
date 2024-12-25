import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Roboto } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/topbar/Topbar";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <Sidebar />
          <Topbar />
          <section
            style={{ height: `calc(100vh - 80px)` }}
            className="pl-64 overflow-y-auto overflow-x-hidden"
          >
            <section className="container mx-auto px-6 py-6 max-w-7xl 2xl:max-w-full bg-[#F2F2F2] min-h-full">
              {children}
            </section>
          </section>
        </main>
      </body>
    </html>
  );
}
