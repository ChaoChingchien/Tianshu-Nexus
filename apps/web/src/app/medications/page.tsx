'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, Space, Tag, message, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { medicationsService } from '@/services/medications.service';
import { DrugCategory, DrugCategoryLabel } from '@tianshu/shared';

export default function MedicationsPage() {
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
      const res = await medicationsService.getDrugs({ search, category, page, limit: 20 });
      setData(res.items || []);
      setTotal(res.total || 0);
    } catch { message.error('获取药品列表失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [page]);

  const handleSearch = () => { setPage(1); fetch(); };

  const handleSave = async (values: any) => {
    try {
      if (editing) {
        await medicationsService.updateDrug(editing.id, values);
        message.success('药品已更新');
      } else {
        await medicationsService.createDrug(values);
        message.success('药品已创建');
      }
      setModalOpen(false);
      setEditing(null);
      form.resetFields();
      fetch();
    } catch { message.error('操作失败'); }
  };

  const handleDelete = async (id: string) => {
    try { await medicationsService.deleteDrug(id); message.success('已删除'); fetch(); }
    catch { message.error('删除失败'); }
  };

  const columns = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '分类', dataIndex: 'category', key: 'category', render: (c: string) => <Tag>{DrugCategoryLabel[c as DrugCategory] || c}</Tag> },
    { title: '规格', dataIndex: 'specification', key: 'specification', responsive: ['md' as any] },
    { title: '库存', dataIndex: 'totalStock', key: 'totalStock', render: (v: number, r: any) => (
      <span style={{ color: v <= r.minStockWarning ? '#ff4d4f' : undefined, fontWeight: v <= r.minStockWarning ? 'bold' : undefined }}>{v}</span>
    )},
    { title: '状态', key: 'status', render: (_: any, r: any) => r.isActive ? <Tag color="green">启用</Tag> : <Tag color="red">停用</Tag> },
    {
      title: '操作', key: 'actions', width: 140,
      render: (_: any, r: any) => (
        <Space>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => { setEditing(r); form.setFieldsValue(r); setModalOpen(true); }}>编辑</Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(r.id)}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="药品字典" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setModalOpen(true); }}>新建药品</Button>}>
      <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
        <Input placeholder="搜索药品名称" prefix={<SearchOutlined />} value={search} onChange={e => setSearch(e.target.value)} onPressEnter={handleSearch} style={{ width: 250 }} allowClear />
        <Select placeholder="分类筛选" value={category} onChange={v => { setCategory(v); setPage(1); fetch(); }} style={{ width: 150 }} allowClear>
          {Object.entries(DrugCategoryLabel).map(([k, v]) => <Select.Option key={k} value={k}>{v}</Select.Option>)}
        </Select>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading}
        pagination={{ current: page, total, pageSize: 20, onChange: setPage }} scroll={{ x: 600 }} size="middle" />

      <Modal title={editing ? '编辑药品' : '新建药品'} open={modalOpen} onCancel={() => { setModalOpen(false); setEditing(null); }} onOk={() => form.submit()} width={600}>
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="name" label="药品名称" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="genericName" label="通用名"><Input /></Form.Item>
          <Form.Item name="category" label="分类" initialValue={DrugCategory.WESTERN}>
            <Select>{Object.entries(DrugCategoryLabel).map(([k, v]) => <Select.Option key={k} value={k}>{v}</Select.Option>)}</Select>
          </Form.Item>
          <Form.Item name="specification" label="规格"><Input /></Form.Item>
          <Form.Item name="unit" label="单位"><Input /></Form.Item>
          <Form.Item name="price" label="价格"><InputNumber min={0} precision={2} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="manufacturer" label="生产厂商"><Input /></Form.Item>
          <Form.Item name="totalStock" label="当前库存"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="minStockWarning" label="最低库存预警"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="defaultDosage" label="默认用量"><Input /></Form.Item>
          <Form.Item name="usage" label="用法"><Input /></Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
