'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, Tabs, message } from 'antd';
import { followupsService } from '@/services/followups.service';
import { FollowUpTypeLabel, FollowUpStatusLabel, FollowUpStatus } from '@tianshu/shared';
import dayjs from 'dayjs';

const statusColor: Record<string, string> = { PENDING: 'orange', COMPLETED: 'green', MISSED: 'red' };

export default function FollowupPlansPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>('');

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await followupsService.getPlans({ status: status || undefined });
      setData(res.items || []);
    } catch { message.error('获取失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [status]);

  return (
    <Card title="随访计划">
      <Tabs activeKey={status} onChange={setStatus} items={[
        { key: '', label: '全部' },
        ...Object.entries(FollowUpStatusLabel).map(([k, v]) => ({ key: k, label: v })),
      ]} />
      <Table dataSource={data} rowKey="id" loading={loading} columns={[
        { title: '患者ID', dataIndex: 'patientId', key: 'patientId' },
        { title: '类型', dataIndex: 'followUpType', key: 'followUpType', render: (v: string) => FollowUpTypeLabel[v as keyof typeof FollowUpTypeLabel] || v },
        { title: '计划日期', dataIndex: 'plannedDate', key: 'plannedDate', render: (v: string) => v ? dayjs(v).format('YYYY-MM-DD') : '-' },
        { title: '状态', dataIndex: 'status', key: 'status', render: (v: string) => <Tag color={statusColor[v]}>{FollowUpStatusLabel[v as keyof typeof FollowUpStatusLabel] || v}</Tag> },
        { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', render: (v: string) => dayjs(v).format('YYYY-MM-DD') },
      ]} pagination={{ pageSize: 20 }} size="middle" />
    </Card>
  );
}
