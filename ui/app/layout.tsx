import type { Metadata } from "next";
import { geistMono, inter } from "./fonts/fonts";
import "./globals.css";
import { cn } from "@/lib/utils";



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
    <html lang="en" suppressHydrationWarning >
      <body
        className={cn(inter.className, geistMono.variable, "antialiased")} suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
