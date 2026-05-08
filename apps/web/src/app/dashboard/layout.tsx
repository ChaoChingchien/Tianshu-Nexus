'use client';

import React from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Typography } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ReadOutlined,
  LogoutOutlined,
  SettingOutlined,
  SafetyCertificateOutlined,
  QrcodeOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import { Role, RoleLabel } from '@tianshu/shared';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  roles: Role[];
  children?: { key: string; label: string; roles: Role[] }[];
}

const menuItems: MenuItem[] = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: '工作台', roles: [Role.ADMIN, Role.DOCTOR, Role.NURSE, Role.PATIENT] },
  {
    key: '/patients',
    icon: <UserOutlined />,
    label: '患者管理',
    roles: [Role.ADMIN, Role.DOCTOR, Role.NURSE],
  },
  {
    key: '/medications',
    icon: <MedicineBoxOutlined />,
    label: '药品管理',
    roles: [Role.ADMIN, Role.DOCTOR, Role.NURSE],
  },
  {
    key: '/treatments',
    icon: <ExperimentOutlined />,
    label: '治疗管理',
    roles: [Role.ADMIN, Role.DOCTOR, Role.NURSE],
  },
  {
    key: '/scheduling',
    icon: <CalendarOutlined />,
    label: '排班预约',
    roles: [Role.ADMIN, Role.DOCTOR, Role.PATIENT],
  },
  {
    key: '/followups',
    icon: <FileTextOutlined />,
    label: '随访管理',
    roles: [Role.ADMIN, Role.DOCTOR, Role.NURSE],
  },
  {
    key: '/education',
    icon: <ReadOutlined />,
    label: '健康宣教',
    roles: [Role.ADMIN, Role.DOCTOR, Role.NURSE, Role.PATIENT],
  },
  {
    key: '/leave',
    icon: <LogoutOutlined />,
    label: '请假外出',
    roles: [Role.ADMIN, Role.DOCTOR, Role.PATIENT],
  },
  {
    key: '/ai',
    icon: <ExperimentOutlined />,
    label: 'AI决策',
    roles: [Role.ADMIN, Role.DOCTOR],
  },
  {
    key: '/qrcode',
    icon: <QrcodeOutlined />,
    label: '二维码',
    roles: [Role.ADMIN, Role.DOCTOR, Role.NURSE],
  },
  {
    key: '/audit',
    icon: <SafetyCertificateOutlined />,
    label: '审计日志',
    roles: [Role.ADMIN],
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: '系统设置',
    roles: [Role.ADMIN],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const filteredMenu = menuItems
    .filter((item) => item.roles.includes(user.role as Role))
    .map(({ key, icon, label }) => ({ key, icon, label }));

  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const userMenu = (
    <Dropdown
      menu={{
        items: [
          { key: 'profile', icon: <UserOutlined />, label: '个人中心', onClick: () => router.push('/profile') },
          { type: 'divider' },
          { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', onClick: handleLogout },
        ],
      }}
    >
      <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar icon={<UserOutlined />} />
        <span>{user.displayName}</span>
        <Text type="secondary" style={{ fontSize: 12 }}>{RoleLabel[user.role as Role]}</Text>
      </div>
    </Dropdown>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={sidebarCollapsed}
        theme="dark"
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
      >
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: sidebarCollapsed ? 14 : 18, fontWeight: 'bold' }}>
          {sidebarCollapsed ? '枢' : '天枢系统'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={filteredMenu}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ marginLeft: sidebarCollapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
        <Header style={{ padding: '0 24px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <Button type="text" icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={toggleSidebar} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <BellOutlined style={{ fontSize: 18 }} />
            {userMenu}
          </div>
        </Header>
        <Content style={{ margin: 24, minHeight: 280 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
