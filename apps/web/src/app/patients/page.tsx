'use client';

import React, { useEffect, useState } from 'react';
import { Table, Card, Input, Select, Tag, Space, Button, message, Tabs } from 'antd';
import { PlusOutlined, SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { patientsService } from '@/services/patients.service';
import { PatientCategory, PatientCategoryLabel, RiskLevel, RiskLevelColor, RiskLevelLabel } from '@tianshu/shared';

const riskColorMap: Record<string, string> = {
  HIGH: '#ff4d4f',
  CRITICAL: '#8B0000',
  MEDIUM: '#faad14',
  LOW: '#52c41a',
};

export default function PatientsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const result = await patientsService.findAll({ category, search, page, limit: 20 });
      setData(result.items);
      setTotal(result.total);
    } catch {
      message.error('获取患者列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [page, category]);

  const handleSearch = () => {
    setPage(1);
    fetchPatients();
  };

  const columns = [
    {
      title: '匿名ID',
      dataIndex: 'anonymousId',
      key: 'anonymousId',
      width: 120,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: any) => (
        <span style={{ color: record.riskLevel === RiskLevel.HIGH || record.riskLevel === RiskLevel.CRITICAL ? '#ff4d4f' : undefined, fontWeight: record.riskLevel === RiskLevel.CRITICAL ? 'bold' : undefined }}>
          {name}
        </span>
      ),
    },
    { title: '性别', dataIndex: 'gender', key: 'gender', width: 60, responsive: ['sm' as any] },
    { title: '年龄', dataIndex: 'age', key: 'age', width: 60, responsive: ['sm' as any] },
    { title: '床位号', dataIndex: 'bedNumber', key: 'bedNumber', width: 90, responsive: ['md' as any] },
    { title: '科室', dataIndex: 'department', key: 'department', width: 100, responsive: ['lg' as any] },
    { title: '诊断', dataIndex: 'diagnosis', key: 'diagnosis', ellipsis: true, responsive: ['md' as any] },
    {
      title: '风险',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      width: 80,
      render: (level: string | null) =>
        level ? <Tag color={riskColorMap[level] || 'default'}>{RiskLevelLabel[level as RiskLevel] || level}</Tag> : null,
    },
    {
      title: '操作',
      key: 'actions',
      width: 160,
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => router.push(`/patients/${record.id}`)}>
            查看
          </Button>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => router.push(`/patients/${record.id}/edit`)}>
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  const categoryTabs = [
    { key: '', label: '全部' },
    ...Object.entries(PatientCategoryLabel).map(([key, label]) => ({ key, label })),
  ];

  return (
    <Card
      title="患者管理"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => router.push('/patients/new')}>
          新建患者
        </Button>
      }
    >
      <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Input
          placeholder="搜索姓名/匿名ID"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onPressEnter={handleSearch}
          style={{ width: 250 }}
          allowClear
        />
        <Button onClick={handleSearch}>搜索</Button>
      </div>

      <Tabs activeKey={category || ''} onChange={(key) => { setCategory(key || undefined); setPage(1); }} items={categoryTabs.map(t => ({ key: t.key, label: t.label }))} />

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{
          current: page,
          total,
          pageSize: 20,
          onChange: setPage,
          showSizeChanger: false,
          showTotal: (t) => `共 ${t} 条`,
        }}
        scroll={{ x: 800 }}
        size="middle"
      />
    </Card>
  );
}
