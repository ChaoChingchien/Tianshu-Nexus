'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, Space, Tag, message, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { treatmentsService } from '@/services/treatments.service';
import { TreatmentCategory, TreatmentCategoryLabel } from '@tianshu/shared';

export default function TreatmentsPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await treatmentsService.getCatalog({ search, category, page, limit: 20 });
      setData(res.items || []);
      setTotal(res.total || 0);
    } catch { message.error('获取治疗项目列表失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [page]);

  const handleSave = async (values: any) => {
    try {
      if (editing) {
        await treatmentsService.updateCatalogItem(editing.id, values);
        message.success('治疗项目已更新');
      } else {
        await treatmentsService.createCatalogItem(values);
        message.success('治疗项目已创建');
      }
      setModalOpen(false);
      setEditing(null);
      form.resetFields();
      fetch();
    } catch { message.error('操作失败'); }
  };

  const handleDelete = async (id: string) => {
    try { await treatmentsService.deleteCatalogItem(id); message.success('已删除'); fetch(); }
    catch { message.error('删除失败'); }
  };

  const columns = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '分类', dataIndex: 'category', key: 'category', render: (c: string) => <Tag>{TreatmentCategoryLabel[c as TreatmentCategory] || c}</Tag> },
    { title: '标准时长(分)', dataIndex: 'standardDuration', key: 'standardDuration', responsive: ['md' as any] },
    { title: '价格', dataIndex: 'price', key: 'price', render: (v: number) => v ? `¥${v.toFixed(2)}` : '-', responsive: ['md' as any] },
    { title: '状态', key: 'status', render: (_: any, r: any) => r.isActive ? <Tag color="green">启用</Tag> : <Tag color="red">停用</Tag> },
    {
      title: '操作', key: 'actions',
      render: (_: any, r: any) => (
        <Space>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => { setEditing(r); form.setFieldsValue(r); setModalOpen(true); }}>编辑</Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(r.id)}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="治疗项目目录" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setModalOpen(true); }}>新建项目</Button>}>
      <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
        <Input placeholder="搜索项目名称" prefix={<SearchOutlined />} value={search} onChange={e => setSearch(e.target.value)} onPressEnter={() => { setPage(1); fetch(); }} style={{ width: 250 }} allowClear />
        <Select placeholder="分类筛选" value={category} onChange={v => { setCategory(v); setPage(1); fetch(); }} style={{ width: 160 }} allowClear>
          {Object.entries(TreatmentCategoryLabel).map(([k, v]) => <Select.Option key={k} value={k}>{v}</Select.Option>)}
        </Select>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading}
        pagination={{ current: page, total, pageSize: 20, onChange: setPage }} scroll={{ x: 700 }} size="middle" />

      <Modal title={editing ? '编辑治疗项目' : '新建治疗项目'} open={modalOpen} onCancel={() => { setModalOpen(false); setEditing(null); }} onOk={() => form.submit()} width={600}>
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="name" label="项目名称" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="code" label="项目编码"><Input /></Form.Item>
          <Form.Item name="category" label="分类" initialValue={TreatmentCategory.ACUPUNCTURE}>
            <Select>{Object.entries(TreatmentCategoryLabel).map(([k, v]) => <Select.Option key={k} value={k}>{v}</Select.Option>)}</Select>
          </Form.Item>
          <Form.Item name="standardDuration" label="标准时长(分钟)"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="standardFrequency" label="标准频率"><Input /></Form.Item>
          <Form.Item name="price" label="价格"><InputNumber min={0} precision={2} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="description" label="描述"><Input.TextArea rows={3} /></Form.Item>
          <Form.Item name="requiredEquipment" label="所需设备"><Input /></Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
