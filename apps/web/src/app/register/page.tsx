'use client';

import React from 'react';
import { Steps, Button, Form, Input, Select, message } from 'antd';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

export default function RegisterPage() {
  const router = useRouter();
  const [current, setCurrent] = React.useState(0);
  const [inviteCode, setInviteCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleInviteNext = (values: { invitationCode: string }) => {
    setInviteCode(values.invitationCode);
    setCurrent(1);
  };

  const handleRegister = async (values: any) => {
    setLoading(true);
    try {
      await authService.register({
        ...values,
        invitationCode: inviteCode,
      });
      message.success('注册成功，请登录');
      router.push('/login');
    } catch (err: any) {
      message.error(err.response?.data?.message || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: '验证邀请码',
      content: (
        <Form onFinish={handleInviteNext} style={{ maxWidth: 400, margin: '24px auto' }}>
          <Form.Item
            name="invitationCode"
            label="邀请码"
            rules={[
              { required: true, message: '请输入8位邀请码' },
              { len: 8, message: '邀请码为8位' },
            ]}
          >
            <Input placeholder="请输入8位邀请码" maxLength={8} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              下一步
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: '填写注册信息',
      content: (
        <Form onFinish={handleRegister} layout="vertical" style={{ maxWidth: 400, margin: '24px auto' }}>
          <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, min: 6 }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="displayName" label="姓名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="hospital" label="所属医院">
            <Input />
          </Form.Item>
          <Form.Item name="department" label="所属科室">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              注册
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '48px 24px', background: '#f0f2f5' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 8 }}>
        <h1 style={{ textAlign: 'center', marginBottom: 32 }}>患者自助注册</h1>
        <Steps current={current} items={steps} />
        <div style={{ marginTop: 32 }}>{steps[current].content}</div>
      </div>
    </div>
  );
}
