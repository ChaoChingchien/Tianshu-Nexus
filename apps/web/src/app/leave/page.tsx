'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, Tabs, Button, Space, Modal, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { leaveService } from '@/services/leave.service';
import { LeaveTypeLabel, LeaveStatusLabel, LeaveStatus } from '@tianshu/shared';
import dayjs from 'dayjs';
import { useAuthStore } from '@/stores/authStore';
import { Role } from '@tianshu/shared';

const statusColor: Record<string, string> = { PENDING_APPROVAL: 'orange', APPROVED: 'green', REJECTED: 'red' };

export default function LeavePage() {
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>('');

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await leaveService.getLeaves({ status: status || undefined });
      setData(res.items || []);
    } catch { message.error('获取失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [status]);

  const handleApprove = async (id: string) => {
    try { await leaveService.approveLeave(id); message.success('已批准'); fetch(); }
    catch { message.error('操作失败'); }
  };

  const handleReject = async (id: string) => {
    try { await leaveService.rejectLeave(id); message.success('已拒绝'); fetch(); }
    catch { message.error('操作失败'); }
  };

  const handleCancel = async (id: string) => {
    try { await leaveService.cancelLeave(id); message.success('已取消'); fetch(); }
    catch { message.error('操作失败'); }
  };

  const isDoctor = user?.role === Role.DOCTOR || user?.role === Role.ADMIN;

  return (
    <Card title="请假审批">
      <Tabs activeKey={status} onChange={setStatus} items={[
        { key: '', label: '全部' },
        ...Object.entries(LeaveStatusLabel).map(([k, v]) => ({ key: k, label: v })),
      ]} />
      <Table dataSource={data} rowKey="id" loading={loading} columns={[
        { title: '患者', dataIndex: 'patientId', key: 'patientId' },
        { title: '类型', dataIndex: 'leaveType', key: 'leaveType', render: (v: string) => LeaveTypeLabel[v as keyof typeof LeaveTypeLabel] || v },
        { title: '开始时间', dataIndex: 'startTime', key: 'startTime', render: (v: string) => v ? dayjs(v).format('MM-DD HH:mm') : '-' },
        { title: '结束时间', dataIndex: 'endTime', key: 'endTime', render: (v: string) => v ? dayjs(v).format('MM-DD HH:mm') : '-' },
        { title: '原因', dataIndex: 'reason', key: 'reason', ellipsis: true },
        { title: '状态', dataIndex: 'status', key: 'status', render: (v: string) => <Tag color={statusColor[v]}>{LeaveStatusLabel[v as keyof typeof LeaveStatusLabel] || v}</Tag> },
        { title: '操作', key: 'actions', render: (_: any, r: any) => (
          <Space>
            {isDoctor && r.status === 'PENDING_APPROVAL' && (
              <>
                <Button type="link" icon={<CheckCircleOutlined />} onClick={() => handleApprove(r.id)}>批准</Button>
                <Button type="link" danger icon={<CloseCircleOutlined />} onClick={() => handleReject(r.id)}>拒绝</Button>
              </>
            )}
            {r.status === 'PENDING_APPROVAL' && !isDoctor && (
              <Button type="link" onClick={() => handleCancel(r.id)}>取消申请</Button>
            )}
          </Space>
        )},
      ]} pagination={{ pageSize: 20 }} size="middle" />
    </Card>
  );
}
