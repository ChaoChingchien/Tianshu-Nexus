'use client';

import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Table, Tag, message } from 'antd';
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, PercentageOutlined } from '@ant-design/icons';
import { schedulingService } from '@/services/scheduling.service';

export default function SchedulingPage() {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalAppointments: 0, confirmed: 0, available: 0, utilizationRate: 0 });
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const [statsRes, apptRes] = await Promise.all([
          schedulingService.getDashboardStats(),
          schedulingService.getAppointments({ limit: 10 }),
        ]);
        setStats(statsRes || { totalAppointments: 0, confirmed: 0, available: 0, utilizationRate: 0 });
        setAppointments(apptRes.items || []);
      } catch { message.error('获取排班数据失败'); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const columns = [
    { title: '患者', dataIndex: 'patientName', key: 'patientName' },
    { title: '医生', dataIndex: 'doctorName', key: 'doctorName' },
    { title: '日期', dataIndex: 'appointmentDate', key: 'appointmentDate', render: (v: string) => v ? v.split('T')[0] : '-' },
    { title: '时间段', key: 'time', render: (_: any, r: any) => `${r.startTime || '-'} - ${r.endTime || '-'}` },
    { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => {
      const map: Record<string, any> = {
        CONFIRMED: <Tag color="blue">已确认</Tag>,
        CHECKED_IN: <Tag color="orange">已签到</Tag>,
        CANCELLED: <Tag color="red">已取消</Tag>,
        COMPLETED: <Tag color="green">已完成</Tag>,
        NO_SHOW: <Tag>未到诊</Tag>,
      };
      return map[s] || <Tag>{s}</Tag>;
    }},
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}><Card><Statistic title="总预约" value={stats.totalAppointments} prefix={<CalendarOutlined />} /></Card></Col>
        <Col span={6}><Card><Statistic title="已确认" value={stats.confirmed} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="可用号源" value={stats.available} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#52c41a' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="使用率" value={stats.utilizationRate} suffix="%" prefix={<PercentageOutlined />} valueStyle={{ color: stats.utilizationRate > 80 ? '#faad14' : '#52c41a' }} /></Card></Col>
      </Row>

      <Card title="近日预约">
        <Table columns={columns} dataSource={appointments} rowKey="id" loading={loading} scroll={{ x: 600 }} size="middle" pagination={false} />
      </Card>
    </div>
  );
}
