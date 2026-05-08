'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Select, Tag, message, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { treatmentsService } from '@/services/treatments.service';

const meridians = ['手太阴肺经', '手阳明大肠经', '足阳明胃经', '足太阴脾经', '手少阴心经', '手太阳小肠经', '足太阳膀胱经', '足少阴肾经', '手厥阴心包经', '手少阳三焦经', '足少阳胆经', '足厥阴肝经', '任脉', '督脉'];

export default function AcupointsPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [meridian, setMeridian] = useState<string>();

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await treatmentsService.getAcupoints({ search, meridian, page, limit: 20 });
      setData(res.items || []);
      setTotal(res.total || 0);
    } catch { message.error('获取穴位列表失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [page]);

  const columns = [
    { title: '穴位名称', dataIndex: 'name', key: 'name', render: (v: string, r: any) => <a onClick={() => message.info(`编码: ${r.code || '-'} | 拼音: ${r.pinyin || '-'}`)}>{v}</a> },
    { title: '编码', dataIndex: 'code', key: 'code' },
    { title: '拼音', dataIndex: 'pinyin', key: 'pinyin', responsive: ['md' as any] },
    { title: '所属经络', dataIndex: 'meridian', key: 'meridian', render: (v: string) => v ? <Tag>{v}</Tag> : '-', responsive: ['md' as any] },
    { title: '分类', dataIndex: 'category', key: 'category', responsive: ['sm' as any] },
    { title: '定位', dataIndex: 'simpleLocation', key: 'simpleLocation', ellipsis: true, responsive: ['lg' as any] },
    { title: '功效', dataIndex: 'effects', key: 'effects', ellipsis: true, responsive: ['xl' as any] },
  ];

  return (
    <Card title="穴位管理">
      <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
        <Input placeholder="搜索穴位名称/拼音" prefix={<SearchOutlined />} value={search} onChange={e => setSearch(e.target.value)} onPressEnter={() => { setPage(1); fetch(); }} style={{ width: 250 }} allowClear />
        <Select placeholder="选择经络" value={meridian} onChange={v => { setMeridian(v); setPage(1); fetch(); }} style={{ width: 200 }} allowClear>
          {meridians.map(m => <Select.Option key={m} value={m}>{m}</Select.Option>)}
        </Select>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading}
        pagination={{ current: page, total, pageSize: 20, onChange: setPage }} scroll={{ x: 800 }} size="middle" />
    </Card>
  );
}
