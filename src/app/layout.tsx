'use client'
import "./globals.css";
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        className={'h-screen'}
      >
        <header className='sticky top-0 bg-black text-white text-4xl text-center w-full'>
          <h1>IP Lookup</h1>
        </header>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
