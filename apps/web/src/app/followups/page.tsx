'use client';

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button, Modal, Form, Input, InputNumber, Select, DatePicker, message, Space } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import { followupsService } from '@/services/followups.service';
import { FollowUpTypeLabel, FollowUpStatusLabel, FollowUpStatus } from '@tianshu/shared';
import dayjs from 'dayjs';

const statusColor: Record<string, string> = { PENDING: 'orange', COMPLETED: 'green', MISSED: 'red' };

export default function FollowupsPage() {
  const [stats, setStats] = useState<any>({});
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [execModal, setExecModal] = useState(false);
  const [executing, setExecuting] = useState<any>(null);
  const [form] = Form.useForm();

  const fetch = async () => {
    setLoading(true);
    try {
      const [s, p] = await Promise.all([followupsService.getStats(), followupsService.getTodayPending()]);
      setStats(s || {});
      setPending(p?.items || p || []);
    } catch { message.error('获取数据失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleExecute = async (values: any) => {
    try {
      await followupsService.executeFollowUp(executing.id, {
        ...values,
        nextFollowUpDate: values.nextFollowUpDate?.toISOString(),
      });
      message.success('随访记录已保存');
      setExecModal(false);
      setExecuting(null);
      form.resetFields();
      fetch();
    } catch { message.error('提交失败'); }
  };

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}><Card><Statistic title="待执行" value={stats.pending || 0} valueStyle={{ color: '#faad14' }} prefix={<ClockCircleOutlined />} /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="已完成" value={stats.completed || 0} valueStyle={{ color: '#52c41a' }} prefix={<CheckCircleOutlined />} /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="已错过" value={stats.missed || 0} valueStyle={{ color: '#ff4d4f' }} prefix={<CloseCircleOutlined />} /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="今日待随访" value={pending.length} prefix={<FileTextOutlined />} /></Card></Col>
      </Row>
      <Card title="今日待随访">
        <Table dataSource={pending} rowKey="id" loading={loading} columns={[
          { title: '患者', dataIndex: 'patientId', key: 'patientId' },
          { title: '类型', dataIndex: 'followUpType', key: 'followUpType', render: (v: string) => FollowUpTypeLabel[v as keyof typeof FollowUpTypeLabel] || v },
          { title: '计划日期', dataIndex: 'plannedDate', key: 'plannedDate', render: (v: string) => v ? dayjs(v).format('YYYY-MM-DD') : '-' },
          { title: '状态', dataIndex: 'status', key: 'status', render: (v: string) => <Tag color={statusColor[v]}>{FollowUpStatusLabel[v as keyof typeof FollowUpStatusLabel] || v}</Tag> },
          { title: '操作', key: 'actions', render: (_: any, r: any) => (
            <Button type="primary" size="small" onClick={() => { setExecuting(r); setExecModal(true); }} disabled={r.status !== 'PENDING'}>执行随访</Button>
          )},
        ]} pagination={false} size="middle" />
      </Card>
      <Modal title="执行随访" open={execModal} onCancel={() => { setExecModal(false); setExecuting(null); }} onOk={() => form.submit()} width={600}>
        <Form form={form} layout="vertical" onFinish={handleExecute}>
          <Form.Item name="currentSymptoms" label="当前症状"><Input.TextArea rows={2} /></Form.Item>
          <Form.Item name="medicationCompliance" label="用药依从性"><Input /></Form.Item>
          <Form.Item name="adverseReactions" label="不良反应"><Input /></Form.Item>
          <Form.Item name="bloodPressure" label="血压"><Input placeholder="例如: 120/80" /></Form.Item>
          <Form.Item name="heartRate" label="心率"><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="doctorAssessment" label="医生评估"><Input.TextArea rows={2} /></Form.Item>
          <Form.Item name="treatmentAdjustment" label="治疗调整方案"><Input.TextArea rows={2} /></Form.Item>
          <Form.Item name="nextFollowUpDate" label="下次随访日期"><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="patientScore" label="患者评分"><InputNumber min={1} max={10} style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
