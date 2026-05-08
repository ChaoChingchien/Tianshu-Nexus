'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, InputNumber, Select, Tag, Space, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { medicationsService } from '@/services/medications.service';

const orderStatusMap: Record<string, any> = {
  pending: <Tag color="orange">待处理</Tag>,
  processing: <Tag color="blue">处理中</Tag>,
  completed: <Tag color="green">已完成</Tag>,
  cancelled: <Tag color="red">已取消</Tag>,
};

export default function OrdersPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await medicationsService.getOrders({ page, limit: 20 });
      setData(res.items || []);
      setTotal(res.total || 0);
    } catch { message.error('获取订单列表失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [page]);

  const handleCreate = async (values: any) => {
    try {
      await medicationsService.createOrder(values);
      message.success('订单已创建');
      setModalOpen(false);
      form.resetFields();
      fetch();
    } catch { message.error('创建失败'); }
  };

  const columns = [
    { title: '订单编号', dataIndex: 'id', key: 'id', ellipsis: true, width: 180 },
    { title: '患者', dataIndex: 'patientName', key: 'patientName' },
    { title: '药品', dataIndex: 'drugName', key: 'drugName' },
    { title: '数量', dataIndex: 'quantity', key: 'quantity' },
    { title: '金额', dataIndex: 'totalPrice', key: 'totalPrice', render: (v: number) => v ? `¥${v.toFixed(2)}` : '-', responsive: ['md' as any] },
    { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => orderStatusMap[s] || <Tag>{s}</Tag> },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', render: (v: string) => v ? new Date(v).toLocaleString() : '-', responsive: ['lg' as any] },
  ];

  return (
    <Card title="药品订单" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { form.resetFields(); setModalOpen(true); }}>新建订单</Button>}>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading}
        pagination={{ current: page, total, pageSize: 20, onChange: setPage }} scroll={{ x: 700 }} size="middle" />

      <Modal title="新建订单" open={modalOpen} onCancel={() => setModalOpen(false)} onOk={() => form.submit()} width={500}>
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item name="patientId" label="患者ID" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="drugId" label="药品ID" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="quantity" label="数量" rules={[{ required: true }]}><InputNumber min={1} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="remark" label="备注"><Input.TextArea rows={3} /></Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
