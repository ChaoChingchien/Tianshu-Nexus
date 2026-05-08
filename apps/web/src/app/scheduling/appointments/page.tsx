'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, DatePicker, Tag, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { schedulingService } from '@/services/scheduling.service';
import { AppointmentStatus, AppointmentStatusLabel } from '@tianshu/shared';
import dayjs from 'dayjs';

const statusFilters = [
  { key: '', label: '全部' },
  ...Object.entries(AppointmentStatusLabel).map(([k, v]) => ({ key: k, label: v })),
];

const statusColors: Record<string, string> = {
  CONFIRMED: 'blue',
  CHECKED_IN: 'orange',
  CANCELLED: 'red',
  COMPLETED: 'green',
  NO_SHOW: 'default',
};

export default function AppointmentsPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetch = async () => {
    setLoading(true);
    try {
      const query: any = { page, limit: 20 };
      if (statusFilter) query.status = statusFilter;
      const res = await schedulingService.getAppointments(query);
      setData(res.items || []);
      setTotal(res.total || 0);
    } catch { message.error('获取预约列表失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [page, statusFilter]);

  const handleCreate = async (values: any) => {
    try {
      await schedulingService.createAppointment({
        ...values,
        appointmentDate: values.appointmentDate?.format('YYYY-MM-DD'),
      });
      message.success('预约已创建');
      setModalOpen(false);
      form.resetFields();
      fetch();
    } catch { message.error('创建失败'); }
  };

  const handleCancel = async (id: string) => {
    try { await schedulingService.cancelAppointment(id); message.success('已取消'); fetch(); }
    catch { message.error('取消失败'); }
  };

  const handleCheckIn = async (id: string) => {
    try { await schedulingService.checkInAppointment(id); message.success('已签到'); fetch(); }
    catch { message.error('签到失败'); }
  };

  const handleComplete = async (id: string) => {
    try { await schedulingService.completeAppointment(id); message.success('已完成'); fetch(); }
    catch { message.error('操作失败'); }
  };

  const columns = [
    { title: '患者', dataIndex: 'patientName', key: 'patientName' },
    { title: '医生', dataIndex: 'doctorName', key: 'doctorName' },
    { title: '日期', dataIndex: 'appointmentDate', key: 'appointmentDate', render: (v: string) => v ? v.split('T')[0] : '-' },
    { title: '时间', key: 'time', render: (_: any, r: any) => `${r.startTime || '-'} - ${r.endTime || '-'}` },
    { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={statusColors[s]}>{AppointmentStatusLabel[s as AppointmentStatus] || s}</Tag> },
    {
      title: '操作', key: 'actions', width: 200,
      render: (_: any, r: any) => (
        <Space>
          {r.status === AppointmentStatus.CONFIRMED && <Button type="link" size="small" onClick={() => handleCheckIn(r.id)}>签到</Button>}
          {r.status === AppointmentStatus.CHECKED_IN && <Button type="link" size="small" onClick={() => handleComplete(r.id)}>完成</Button>}
          {(r.status === AppointmentStatus.CONFIRMED || r.status === AppointmentStatus.CHECKED_IN) && <Button type="link" size="small" danger onClick={() => handleCancel(r.id)}>取消</Button>}
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="预约管理"
      extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { form.resetFields(); setModalOpen(true); }}>新建预约</Button>}
    >
      <div style={{ marginBottom: 16 }}>
        <Select placeholder="状态筛选" value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1); }} style={{ width: 160 }} allowClear>
          {statusFilters.map(s => <Select.Option key={s.key} value={s.key}>{s.label}</Select.Option>)}
        </Select>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading}
        pagination={{ current: page, total, pageSize: 20, onChange: setPage }} scroll={{ x: 700 }} size="middle" />

      <Modal title="新建预约" open={modalOpen} onCancel={() => setModalOpen(false)} onOk={() => form.submit()} width={500}>
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item name="patientId" label="患者ID" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="doctorId" label="医生ID" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="appointmentDate" label="预约日期" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="startTime" label="开始时间" rules={[{ required: true }]}><Input placeholder="HH:mm" /></Form.Item>
          <Form.Item name="endTime" label="结束时间" rules={[{ required: true }]}><Input placeholder="HH:mm" /></Form.Item>
          <Form.Item name="treatmentItemId" label="治疗项目ID"><Input /></Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
