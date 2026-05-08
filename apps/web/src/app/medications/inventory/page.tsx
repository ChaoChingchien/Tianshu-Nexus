'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, message } from 'antd';
import { medicationsService } from '@/services/medications.service';

export default function InventoryPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await medicationsService.getInventory();
      setData(Array.isArray(res) ? res : res?.items || []);
    } catch { message.error('获取库存列表失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const getStockColor = (totalStock: number, minStockWarning: number) => {
    if (totalStock <= minStockWarning || totalStock <= 1) return { color: '#ff4d4f', bg: '#fff2f0', label: '库存不足' };
    if (totalStock <= minStockWarning * 2 || totalStock <= 3) return { color: '#fa8c16', bg: '#fff7e6', label: '库存偏低' };
    return { color: '#52c41a', bg: '#f6ffed', label: '库存充足' };
  };

  const columns = [
    { title: '药品名称', dataIndex: 'drugName', key: 'drugName' },
    { title: '规格', dataIndex: 'specification', key: 'specification', responsive: ['md' as any] },
    { title: '分类', dataIndex: 'category', key: 'category', responsive: ['sm' as any] },
    {
      title: '当前库存', dataIndex: 'totalStock', key: 'totalStock', sorter: (a: any, b: any) => a.totalStock - b.totalStock,
      render: (v: number, r: any) => {
        const sc = getStockColor(v, r.minStockWarning);
        return <Tag color={sc.color} style={{ fontWeight: 'bold' }}>{v}</Tag>;
      },
    },
    {
      title: '库存状态', key: 'stockStatus',
      render: (_: any, r: any) => {
        const sc = getStockColor(r.totalStock, r.minStockWarning);
        return <span style={{ color: sc.color, background: sc.bg, padding: '2px 8px', borderRadius: 4, fontSize: 13 }}>{sc.label}</span>;
      },
    },
    { title: '最低预警', dataIndex: 'minStockWarning', key: 'minStockWarning', render: (v: number) => v ?? '-' },
    { title: '单位', dataIndex: 'unit', key: 'unit', responsive: ['sm' as any] },
  ];

  return (
    <Card title="药品库存管理">
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(r) => r.id || r.drugId}
        loading={loading}
        scroll={{ x: 700 }}
        size="middle"
      />
    </Card>
  );
}
