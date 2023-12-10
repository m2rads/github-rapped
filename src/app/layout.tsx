import { Inter, Lexend } from 'next/font/google';
import clsx from 'clsx';

import '@/styles/tailwind.css';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s - Github Wrapped',
    default: 'Github Wrapped',
  },
  description:
    "Unwrap Your Code's Story: Discover a Year of Creativity, Collaboration, and Commitments with GitHub Wrapped!",
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={clsx(
        'h-full scroll-smooth text-gray-50 antialiased dark:bg-slate-950',
        inter.variable,
        lexend.variable
      )}
    >
      <body className='flex h-full flex-col'>{children}</body>
    </html>
  );
}
