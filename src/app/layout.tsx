import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "JASAMARGA Dashboard",
  description: "Jasa Marga Dashboard",
};

const roboto = Roboto({
  weight: ["400", "700", "900"],
  display: "swap",
  subsets: ["latin"],
  preload: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.className} antialiased`}
      {...mantineHtmlProps}
      suppressHydrationWarning
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <NextTopLoader showSpinner={false} />
        <Toaster />
        <NuqsAdapter>
          <Provider>
            <main>{children}</main>
          </Provider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
