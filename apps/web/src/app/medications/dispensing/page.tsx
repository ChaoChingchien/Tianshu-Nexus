'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Tabs, Space, Tag, message, Statistic, Row, Col } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, InboxOutlined, CarryOutOutlined } from '@ant-design/icons';
import { medicationsService } from '@/services/medications.service';

const statusFilters = [
  { key: '', label: '全部' },
  { key: 'pending', label: '待配药' },
  { key: 'dispensed', label: '已配药' },
  { key: 'confirmed', label: '已确认' },
];

export default function DispensingPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState({ active: 0, pending: 0, dispensed: 0, undispensed: 0 });
  const [statusTab, setStatusTab] = useState('');

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await medicationsService.getDispensing();
      const items = res.items || res || [];
      setData(Array.isArray(items) ? items : []);
    } catch { message.error('获取配药列表失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleDispense = async (id: string) => {
    try { await medicationsService.dispense({ id }); message.success('配药完成'); fetch(); }
    catch { message.error('配药失败'); }
  };

  const handleConfirm = async (id: string) => {
    try { await medicationsService.confirmDispense(id); message.success('已确认'); fetch(); }
    catch { message.error('确认失败'); }
  };

  const filteredData = statusTab ? data.filter((d: any) => d.status === statusTab) : data;

  const columns = [
    { title: '患者', dataIndex: 'patientName', key: 'patientName' },
    { title: '药品', dataIndex: 'drugName', key: 'drugName' },
    { title: '规格', dataIndex: 'specification', key: 'specification', responsive: ['md' as any] },
    { title: '数量', dataIndex: 'quantity', key: 'quantity' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => {
      const map: Record<string, any> = { pending: <Tag color="orange">待配药</Tag>, dispensed: <Tag color="blue">已配药</Tag>, confirmed: <Tag color="green">已确认</Tag> };
      return map[s] || <Tag>{s}</Tag>;
    }},
    {
      title: '操作', key: 'actions',
      render: (_: any, r: any) => (
        <Space>
          {r.status === 'pending' && <Button type="primary" size="small" onClick={() => handleDispense(r.id)}>配药</Button>}
          {r.status === 'dispensed' && <Button size="small" onClick={() => handleConfirm(r.id)}>确认</Button>}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}><Card><Statistic title="进行中" value={stats.active} prefix={<CarryOutOutlined />} /></Card></Col>
        <Col span={6}><Card><Statistic title="待配药" value={stats.pending} prefix={<InboxOutlined />} valueStyle={{ color: '#faad14' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="已配药" value={stats.dispensed} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="未配药" value={stats.undispensed} prefix={<CloseCircleOutlined />} valueStyle={{ color: '#ff4d4f' }} /></Card></Col>
      </Row>

      <Card title="配药管理">
        <Tabs activeKey={statusTab} onChange={setStatusTab} items={statusFilters.map(s => ({ key: s.key, label: s.label }))} />
        <Table columns={columns} dataSource={filteredData} rowKey="id" loading={loading} scroll={{ x: 600 }} size="middle" />
      </Card>
    </div>
  );
}
