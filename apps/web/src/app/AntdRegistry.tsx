'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const theme = {
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 6,
  },
};

export function AntdRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      {children}
    </ConfigProvider>
  );
}
