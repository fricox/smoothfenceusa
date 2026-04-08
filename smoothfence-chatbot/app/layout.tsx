import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smooth Fence Chatbot',
  description: 'Fency — el asistente virtual de Smooth Fence USA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
