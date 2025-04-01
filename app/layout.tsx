import React from 'react';
import Providers from "@components/Providers";
import Navbar from "@components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers> {/* Wrap everything inside Providers */}
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
