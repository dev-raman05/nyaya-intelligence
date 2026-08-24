import './globals.css';
import { Inter, Source_Serif_4 } from 'next/font/google';
import Layout from '@/components/layout/Layout';
import { AppProvider } from '@/lib/context';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif' });

export const metadata = {
  title: 'Nyaya Intelligence | Premium Legal Research',
  description: 'Citation-grounded AI legal research platform for Indian law.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="font-sans antialiased text-nyaya-text bg-nyaya-bg min-h-screen">
        <AppProvider>
          <Layout>
            {children}
          </Layout>
        </AppProvider>
      </body>
    </html>
  );
}
