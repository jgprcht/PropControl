import "./globals.css";
import type { Metadata } from "next";
import { I18nProvider } from "@/i18n/I18nProvider";

export const metadata: Metadata = {
  title: "PropControl",
  description: "Self-hosted property management and financial control platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
