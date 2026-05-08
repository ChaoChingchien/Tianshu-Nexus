import type { Metadata } from 'next';
import { AntdRegistry } from './AntdRegistry';
import './globals.css';

export const metadata: Metadata = {
  title: '天枢·AI临床决策管理系统',
  description: '面向医院/诊所的综合性临床业务管理系统',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
