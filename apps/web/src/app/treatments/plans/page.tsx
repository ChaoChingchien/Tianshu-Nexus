'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Tabs, Tag, message, Statistic, Row, Col, Space } from 'antd';
import { treatmentsService } from '@/services/treatments.service';
import { TreatmentPlanStatus, TreatmentPlanStatusLabel } from '@tianshu/shared';

const statusTabs = [
  { key: '', label: '全部' },
  { key: TreatmentPlanStatus.DRAFT, label: TreatmentPlanStatusLabel[TreatmentPlanStatus.DRAFT] },
  { key: TreatmentPlanStatus.IN_PROGRESS, label: TreatmentPlanStatusLabel[TreatmentPlanStatus.IN_PROGRESS] },
  { key: TreatmentPlanStatus.COMPLETED, label: TreatmentPlanStatusLabel[TreatmentPlanStatus.COMPLETED] },
  { key: TreatmentPlanStatus.STOPPED, label: TreatmentPlanStatusLabel[TreatmentPlanStatus.STOPPED] },
];

const statusColors: Record<string, string> = {
  [TreatmentPlanStatus.DRAFT]: 'default',
  [TreatmentPlanStatus.IN_PROGRESS]: 'processing',
  [TreatmentPlanStatus.COMPLETED]: 'success',
  [TreatmentPlanStatus.STOPPED]: 'error',
};

export default function PlansPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusTab, setStatusTab] = useState('');

  const fetch = async () => {
    setLoading(true);
    try {
      const query: any = { page, limit: 20 };
      if (statusTab) query.status = statusTab;
      const res = await treatmentsService.getTreatmentPlans(query);
      setData(res.items || []);
      setTotal(res.total || 0);
    } catch { message.error('获取治疗方案列表失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [page, statusTab]);

  const stats = {
    draft: data.filter((d: any) => d.status === TreatmentPlanStatus.DRAFT).length,
    inProgress: data.filter((d: any) => d.status === TreatmentPlanStatus.IN_PROGRESS).length,
    completed: data.filter((d: any) => d.status === TreatmentPlanStatus.COMPLETED).length,
    stopped: data.filter((d: any) => d.status === TreatmentPlanStatus.STOPPED).length,
  };

  const columns = [
    { title: '方案名称', dataIndex: 'name', key: 'name' },
    { title: '患者ID', dataIndex: 'patientId', key: 'patientId', ellipsis: true, responsive: ['sm' as any] },
    { title: '辨证诊断', dataIndex: 'syndromeDiagnosis', key: 'syndromeDiagnosis', ellipsis: true, responsive: ['md' as any] },
    { title: '开始日期', dataIndex: 'startDate', key: 'startDate', render: (v: string) => v ? v.split('T')[0] : '-', responsive: ['md' as any] },
    { title: '结束日期', dataIndex: 'endDate', key: 'endDate', render: (v: string) => v ? v.split('T')[0] : '-', responsive: ['lg' as any] },
    { title: '疗程数', dataIndex: 'courseCount', key: 'courseCount' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={statusColors[s]}>{TreatmentPlanStatusLabel[s as TreatmentPlanStatus] || s}</Tag> },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}><Card><Statistic title="草稿" value={stats.draft} valueStyle={{ color: '#999' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="执行中" value={stats.inProgress} valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="已完成" value={stats.completed} valueStyle={{ color: '#52c41a' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="已停止" value={stats.stopped} valueStyle={{ color: '#ff4d4f' }} /></Card></Col>
      </Row>

      <Card title="治疗方案管理">
        <Tabs activeKey={statusTab} onChange={setStatusTab} items={statusTabs.map(s => ({ key: s.key, label: s.label }))} />
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading}
          pagination={{ current: page, total, pageSize: 20, onChange: setPage }} scroll={{ x: 700 }} size="middle" />
      </Card>
    </div>
  );
}
