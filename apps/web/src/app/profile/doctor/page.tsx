'use client';

import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Form, Input, Button, Spin, message, Statistic, Row, Col } from 'antd';
import { profileService } from '@/services/profile.service';
import { useAuthStore } from '@/stores/authStore';
import { Role } from '@tianshu/shared';

export default function DoctorProfilePage() {
  const user = useAuthStore((s) => s.user);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await profileService.getDoctorPortfolio();
      setPortfolio(res);
    } catch { message.error('获取失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async (values: any) => {
    try {
      await profileService.updateDoctorPortfolio(values);
      message.success('已更新');
      setEditing(false);
      fetch();
    } catch { message.error('保存失败'); }
  };

  if (user?.role !== Role.DOCTOR && user?.role !== Role.ADMIN) {
    return <Card><div style={{ textAlign: 'center', padding: 40, color: '#999' }}>仅医生可查看</div></Card>;
  }

  if (loading) return <Card><div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div></Card>;

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}><Card><Statistic title="总病例数" value={portfolio?.totalCases || 0} /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="成功病例" value={portfolio?.successCases || 0} suffix={`/ ${portfolio?.totalCases || 0}`} /></Card></Col>
      </Row>
      <Card title="医生档案" extra={<Button onClick={() => { setEditing(!editing); form.setFieldsValue(portfolio); }}>{editing ? '取消' : '编辑'}</Button>}>
        {editing ? (
          <Form form={form} layout="vertical" onFinish={handleSave} style={{ maxWidth: 600 }}>
            <Form.Item name="department" label="科室"><Input /></Form.Item>
            <Form.Item name="hospital" label="医院"><Input /></Form.Item>
            <Form.Item name="specialties" label="专长"><Input placeholder="逗号分隔" /></Form.Item>
            <Form.Item name="practiceProfile" label="执业简介"><Input.TextArea rows={3} /></Form.Item>
            <Form.Item name="aiStyleFeatures" label="AI风格特征"><Input.TextArea rows={2} /></Form.Item>
            <Form.Item><Button type="primary" htmlType="submit">保存</Button></Form.Item>
          </Form>
        ) : (
          <Descriptions column={2}>
            <Descriptions.Item label="科室">{portfolio?.department || '-'}</Descriptions.Item>
            <Descriptions.Item label="医院">{portfolio?.hospital || '-'}</Descriptions.Item>
            <Descriptions.Item label="专长" span={2}>{portfolio?.specialties || '-'}</Descriptions.Item>
            <Descriptions.Item label="执业简介" span={2}>{portfolio?.practiceProfile || '-'}</Descriptions.Item>
            <Descriptions.Item label="AI风格特征" span={2}>{portfolio?.aiStyleFeatures || '-'}</Descriptions.Item>
          </Descriptions>
        )}
      </Card>
    </div>
  );
}
