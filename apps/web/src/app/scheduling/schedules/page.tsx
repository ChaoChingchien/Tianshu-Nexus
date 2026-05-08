'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, InputNumber, Select, Space, Tag, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { schedulingService } from '@/services/scheduling.service';

const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export default function SchedulesPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await schedulingService.getSchedules();
      setData(Array.isArray(res) ? res : res?.items || []);
    } catch { message.error('获取排班列表失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async (values: any) => {
    try {
      if (editing) {
        await schedulingService.updateSchedule(editing.id, values);
        message.success('排班已更新');
      } else {
        await schedulingService.createSchedule(values);
        message.success('排班已创建');
      }
      setModalOpen(false);
      setEditing(null);
      form.resetFields();
      fetch();
    } catch { message.error('操作失败'); }
  };

  const handleDelete = async (id: string) => {
    try { await schedulingService.deleteSchedule(id); message.success('已删除'); fetch(); }
    catch { message.error('删除失败'); }
  };

  const columns = [
    { title: '医生ID', dataIndex: 'doctorId', key: 'doctorId', ellipsis: true },
    { title: '医生姓名', dataIndex: 'doctorName', key: 'doctorName' },
    { title: '星期', dataIndex: 'dayOfWeek', key: 'dayOfWeek', render: (v: number) => <Tag>{dayNames[v]}</Tag> },
    { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
    { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
    { title: '可用', dataIndex: 'isAvailable', key: 'isAvailable', render: (v: boolean) => v ? <Tag color="green">可用</Tag> : <Tag color="red">不可用</Tag> },
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
    <Card title="医生排班管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setModalOpen(true); }}>新建排班</Button>}>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} scroll={{ x: 700 }} size="middle" />

      <Modal title={editing ? '编辑排班' : '新建排班'} open={modalOpen} onCancel={() => { setModalOpen(false); setEditing(null); }} onOk={() => form.submit()} width={500}>
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="doctorId" label="医生ID" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="doctorName" label="医生姓名"><Input /></Form.Item>
          <Form.Item name="dayOfWeek" label="星期" rules={[{ required: true }]}>
            <Select>{dayNames.map((n, i) => <Select.Option key={i} value={i}>{n}</Select.Option>)}</Select>
          </Form.Item>
          <Form.Item name="startTime" label="开始时间" rules={[{ required: true }]}><Input placeholder="HH:mm" /></Form.Item>
          <Form.Item name="endTime" label="结束时间" rules={[{ required: true }]}><Input placeholder="HH:mm" /></Form.Item>
          <Form.Item name="isAvailable" label="是否可用" valuePropName="checked" initialValue={true}><Switch /></Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
