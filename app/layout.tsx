import type { Metadata } from "next";
import { Geist_Mono, Nunito_Sans, Paytone_One } from "next/font/google";
import { headers } from "next/headers";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AppShell } from "@/components/app-shell";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

// Prevents a flash of oversized, unstyled icons: without this, fontawesome-svg-core
// injects its sizing CSS client-side after the SVGs already painted.
config.autoAddCss = false;

const heading = Paytone_One({ variable: "--font-heading", subsets: ["latin"], weight: "400" });
const body = Nunito_Sans({ variable: "--font-body", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const image = `${protocol}://${host}/og.png`;
  const title = "CAS Design System";
  const description = "Foundations, components, patterns, and resources for building consistent CarBrain products.";
  return {
    title, description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title, description, images: [{ url: image, width: 1200, height: 630, alt: "CAS Design System" }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} ${mono.variable}`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
