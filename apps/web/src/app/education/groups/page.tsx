'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Space, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { educationService } from '@/services/education.service';

export default function EducationGroupsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await educationService.getGroups();
      setData(Array.isArray(res) ? res : res?.items || []);
    } catch { message.error('获取分组失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async (values: any) => {
    try {
      if (editing) {
        await educationService.updateGroup(editing.id, values);
        message.success('已更新');
      } else {
        await educationService.createGroup(values);
        message.success('已创建');
      }
      setModalOpen(false);
      setEditing(null);
      form.resetFields();
      fetch();
    } catch { message.error('操作失败'); }
  };

  const handleDelete = async (id: string) => {
    try {
      await educationService.deleteGroup(id);
      message.success('已删除');
      fetch();
    } catch { message.error('删除失败'); }
  };

  const openEdit = (record: any) => {
    setEditing(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  return (
    <Card title="患者分组" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setModalOpen(true); }}>新建分组</Button>}>
      <Table dataSource={data} rowKey="id" loading={loading} columns={[
        { title: '分组名称', dataIndex: 'name', key: 'name' },
        { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
        { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', render: (v: string) => v ? new Date(v).toLocaleDateString() : '-' },
        { title: '操作', key: 'actions', render: (_: any, r: any) => (
          <Space>
            <Button type="link" onClick={() => openEdit(r)}>编辑</Button>
            <Popconfirm title="确定删除?" onConfirm={() => handleDelete(r.id)}>
              <Button type="link" danger>删除</Button>
            </Popconfirm>
          </Space>
        )},
      ]} pagination={false} size="middle" />
      <Modal title={editing ? '编辑分组' : '新建分组'} open={modalOpen} onCancel={() => { setModalOpen(false); setEditing(null); }} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="name" label="分组名称" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="description" label="描述"><Input.TextArea rows={3} /></Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
