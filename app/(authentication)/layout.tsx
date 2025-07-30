import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swop Admin",
  description: "Web3 ecommerce admin",
  metadataBase: new URL("https://admin.swopme.app"),
  openGraph: {
    title: "Swop Admin",
    description: "Web3 ecommerce admin",
    url: "https://admin.swopme.app",
    siteName: "Swop Admin",
    images: [
      {
        url: "/og-image.png", // Must be an absolute URL or path from public folder
        width: 1200,
        height: 630,
        alt: "Swop Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swop Admin",
    description: "Web3 ecommerce admin",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
