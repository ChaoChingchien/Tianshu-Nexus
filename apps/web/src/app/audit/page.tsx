'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Select, DatePicker, Tag, Space, message, Row, Col, Statistic, Button } from 'antd';
import { auditService } from '@/services/audit.service';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function AuditLogPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20, total: 0 });
  const [detailModal, setDetailModal] = useState<any>(null);

  const fetch = async (page = 1) => {
    setLoading(true);
    try {
      const query: any = { ...filters, page, limit: pagination.pageSize };
      if (filters.dateRange?.length) {
        query.startDate = filters.dateRange[0].toISOString();
        query.endDate = filters.dateRange[1].toISOString();
      }
      const res = await auditService.getAuditLogs(query);
      setData(res.items || []);
      setPagination(prev => ({ ...prev, current: page, total: res.total || 0 }));
    } catch { message.error('获取审计日志失败'); }
    finally { setLoading(false); }
  };

  const fetchStats = async () => {
    try {
      const s = await auditService.getStats();
      setStats(s);
    } catch {}
  };

  useEffect(() => { fetchStats(); }, []);

  const columns = [
    { title: '操作', dataIndex: 'action', key: 'action', width: 100 },
    { title: '操作人ID', dataIndex: 'operatorId', key: 'operatorId', width: 120 },
    { title: '资源类型', dataIndex: 'resourceType', key: 'resourceType', width: 100 },
    { title: '资源ID', dataIndex: 'resourceId', key: 'resourceId', width: 120, ellipsis: true },
    { title: 'IP地址', dataIndex: 'ipAddress', key: 'ipAddress', width: 130, responsive: ['lg' as any] },
    {
      title: '结果', dataIndex: 'success', key: 'success', width: 70,
      render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? '成功' : '失败'}</Tag>,
    },
    { title: '失败原因', dataIndex: 'failureReason', key: 'failureReason', ellipsis: true, width: 150 },
    { title: '时间', dataIndex: 'createdAt', key: 'createdAt', width: 160, render: (v: string) => v ? dayjs(v).format('YYYY-MM-DD HH:mm:ss') : '-' },
    { title: '操作', key: 'actions', width: 60, render: (_: any, r: any) => <Button type="link" size="small" onClick={() => setDetailModal(r)}>详情</Button> },
  ];

  return (
    <div>
      {stats && (
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={12} sm={6}><Card><Statistic title="总日志数" value={stats.total || 0} /></Card></Col>
          <Col xs={12} sm={6}><Card><Statistic title="今日" value={stats.today || 0} /></Card></Col>
          <Col xs={12} sm={6}><Card><Statistic title="成功" value={stats.success || 0} valueStyle={{ color: '#52c41a' }} /></Card></Col>
          <Col xs={12} sm={6}><Card><Statistic title="失败" value={stats.failed || 0} valueStyle={{ color: '#ff4d4f' }} /></Card></Col>
        </Row>
      )}
      <Card title="审计日志">
        <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Select placeholder="操作类型" allowClear style={{ width: 140 }} onChange={v => setFilters(prev => ({ ...prev, action: v }))} />
          <Select placeholder="资源类型" allowClear style={{ width: 140 }} onChange={v => setFilters(prev => ({ ...prev, resourceType: v }))} />
          <Select placeholder="结果" allowClear style={{ width: 100 }} onChange={v => setFilters(prev => ({ ...prev, success: v === undefined ? undefined : v === 'success' }))}>
            <Select.Option value="success">成功</Select.Option>
            <Select.Option value="failed">失败</Select.Option>
          </Select>
          <RangePicker onChange={(dates) => setFilters(prev => ({ ...prev, dateRange: dates }))} />
          <Button type="primary" onClick={() => fetch()}>查询</Button>
          <Button onClick={() => { setFilters({}); setPagination(prev => ({ ...prev, current: 1 })); }}>重置</Button>
        </div>
        <Table dataSource={data} rowKey="id" loading={loading} columns={columns}
          pagination={{ ...pagination, showSizeChanger: false, showTotal: (t) => `共 ${t} 条` }}
          onChange={(pag) => fetch(pag.current)}
          scroll={{ x: 900 }} size="middle" />
      </Card>
    </div>
  );
}
