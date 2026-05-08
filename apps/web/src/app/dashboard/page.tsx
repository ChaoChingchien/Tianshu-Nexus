'use client';

import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { UserOutlined, TeamOutlined, MedicineBoxOutlined, CalendarOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';
import { Role, RoleLabel } from '@tianshu/shared';

const { Title } = Typography;

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  const statsCards = [
    { title: '今日患者', value: 0, icon: <TeamOutlined />, color: '#1677ff' },
    { title: '待处理医嘱', value: 0, icon: <MedicineBoxOutlined />, color: '#52c41a' },
    { title: '今日预约', value: 0, icon: <CalendarOutlined />, color: '#faad14' },
    { title: '待随访', value: 0, icon: <UserOutlined />, color: '#ff4d4f' },
  ];

  return (
    <div>
      <Title level={4} style={{ marginBottom: 24 }}>
        欢迎回来，{user.displayName}
        <span style={{ marginLeft: 12, fontSize: 14, fontWeight: 'normal', color: '#666' }}>
          {RoleLabel[user.role as Role]}
        </span>
      </Title>

      <Row gutter={[16, 16]}>
        {statsCards.map((card) => (
          <Col xs={24} sm={12} lg={6} key={card.title}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, color: '#666' }}>{card.title}</div>
                  <div style={{ fontSize: 32, fontWeight: 'bold', marginTop: 8 }}>{card.value}</div>
                </div>
                <div style={{ fontSize: 48, color: card.color, opacity: 0.3 }}>
                  {card.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="快捷操作">
            <p>系统功能将根据角色显示不同的操作入口。</p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="系统通知">
            <p>项目初始化完成，欢迎使用天枢临床决策管理系统。</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
