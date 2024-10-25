import type { Metadata } from "next";
import { geistMono, inter } from "./fonts/fonts";
import "./globals.css";




export const metadata: Metadata = {
  title: "Strix Invoice",
  description: "Manage invoices, track payments, and generate reports—all in one place. StrixInvoice makes running your business simple, fast, and stress-free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
