'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Select, Tag, message, Space, Button, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { treatmentsService } from '@/services/treatments.service';
import { TCMTreatmentCategory, TCMTreatmentCategoryLabel } from '@tianshu/shared';

export default function TCMPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>();

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await treatmentsService.getTCMTreatments({ search, category, page, limit: 20 });
      setData(res.items || []);
      setTotal(res.total || 0);
    } catch { message.error('获取中医治疗列表失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [page]);

  const columns = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '分类', dataIndex: 'category', key: 'category', render: (c: string) => <Tag>{TCMTreatmentCategoryLabel[c as TCMTreatmentCategory] || c}</Tag> },
    { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true, responsive: ['md' as any] },
    { title: '适应症', dataIndex: 'indications', key: 'indications', ellipsis: true, responsive: ['lg' as any] },
    { title: '参考价格', dataIndex: 'referencePrice', key: 'referencePrice', render: (v: number) => v ? `¥${v.toFixed(2)}` : '-', responsive: ['sm' as any] },
  ];

  return (
    <Card
      title="中医治疗管理"
      extra={<Button type="primary" icon={<PlusOutlined />}>新建中医治疗</Button>}
    >
      <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
        <Input placeholder="搜索名称" prefix={<SearchOutlined />} value={search} onChange={e => setSearch(e.target.value)} onPressEnter={() => { setPage(1); fetch(); }} style={{ width: 250 }} allowClear />
        <Select placeholder="分类筛选" value={category} onChange={v => { setCategory(v); setPage(1); fetch(); }} style={{ width: 160 }} allowClear>
          {Object.entries(TCMTreatmentCategoryLabel).map(([k, v]) => <Select.Option key={k} value={k}>{v}</Select.Option>)}
        </Select>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading}
        pagination={{ current: page, total, pageSize: 20, onChange: setPage }} scroll={{ x: 700 }} size="middle" />
    </Card>
  );
}
