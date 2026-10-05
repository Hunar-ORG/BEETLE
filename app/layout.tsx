import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BEETLE",
  description:
    "BEETLE is a web design and development studio that makes every business impossible to overlook.",
  metadataBase: new URL("https://beetle.works"),
  icons: {
    icon: "/brand/beetle-mark.svg",
    shortcut: "/brand/beetle-mark.svg",
    apple: "/brand/beetle-mark.svg",
  },
  openGraph: {
    title: "BEETLE",
    description:
      "BEETLE is a web design and development studio that makes every business impossible to overlook.",
    url: "https://beetle.works/",
    siteName: "BEETLE",
    type: "website",
    images: [
      {
        url: "https://beetle.works/images/projects/preview.png",
        width: 1200,
        height: 630,
        alt: "BEETLE website preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BEETLE",
    description:
      "BEETLE is a web design and development studio that makes every business impossible to overlook.",
    images: ["https://beetle.works/images/projects/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                window.scrollTo(0, 0);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-[#010403] text-white antialiased selection:bg-emerald-500/25 selection:text-emerald-100`}
      >
        <LoadingScreen />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
