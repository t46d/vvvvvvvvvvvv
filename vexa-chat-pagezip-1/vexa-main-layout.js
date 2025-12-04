import { AuthProvider } from '@/hooks/useAuth';
import './globals.css';

export const metadata = {
  title: 'VeXa - منصة الدردشة والتعارف',
  description: 'تواصل مع أشخاص جدد واكتشف صداقات جديدة',
  keywords: ['دردشة', 'تعارف', 'صداقات', 'تواصل'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50 min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}