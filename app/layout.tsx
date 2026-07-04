import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/ui/LoadingScreen';

export const metadata: Metadata = {
  title: "Pollen Floral Studio — Nashville's Studio Florist",
  description:
    'Bold, seasonal arrangements and editorial floral design. Made by hand in East Nashville, TN. @pollen_floral_studio.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased" style={{ backgroundColor: 'var(--color-void)' }}>
        <LoadingScreen />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
