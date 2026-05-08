'use client';

import React from 'react';
import { Card, Form, Input, Select, DatePicker, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { leaveService } from '@/services/leave.service';
import { LeaveType, LeaveTypeLabel } from '@tianshu/shared';

export default function NewLeavePage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const leaveType = Form.useWatch('leaveType', form);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await leaveService.createLeave({
        ...values,
        startTime: values.startTime?.toISOString(),
        endTime: values.endTime?.toISOString(),
      });
      message.success('申请已提交');
      router.push('/leave');
    } catch { message.error('提交失败'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <Button icon={<ArrowLeftOutlined />} onClick={() => router.push('/leave')} style={{ marginBottom: 16 }}>返回</Button>
      <Card title="新建申请">
        <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ maxWidth: 500 }}>
          <Form.Item name="leaveType" label="申请类型" rules={[{ required: true }]} initialValue={LeaveType.LEAVE}>
            <Select>{Object.entries(LeaveTypeLabel).map(([k, v]) => <Select.Option key={k} value={k}>{v}</Select.Option>)}</Select>
          </Form.Item>
          <Form.Item name="startTime" label="开始时间" rules={[{ required: true }]}>
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="endTime" label="结束时间" rules={[{ required: true }]}>
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="reason" label="原因" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          {leaveType === LeaveType.OUTING && (
            <>
              <Form.Item name="destination" label="目的地"><Input /></Form.Item>
              <Form.Item name="emergencyContact" label="紧急联系电话"><Input /></Form.Item>
            </>
          )}
          <Form.Item><Button type="primary" htmlType="submit" loading={loading}>提交申请</Button></Form.Item>
        </Form>
      </Card>
    </div>
  );
}
