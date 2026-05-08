'use client';

import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/auth.service';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = React.useState(false);
  const [totpStep, setTotpStep] = React.useState(false);
  const [userId, setUserId] = React.useState('');

  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const result = await authService.login(values.username, values.password);
      if (result.requiresTotp) {
        setUserId(result.userId);
        setTotpStep(true);
      } else {
        login(result.accessToken, result.user);
        message.success('登录成功');
        router.push('/dashboard');
      }
    } catch (err: any) {
      message.error(err.response?.data?.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  const handleTotpVerify = async (values: { token: string }) => {
    setLoading(true);
    try {
      const result = await authService.verifyTotp(userId, values.token);
      login(result.accessToken, result.user);
      message.success('登录成功');
      router.push('/dashboard');
    } catch (err: any) {
      message.error(err.response?.data?.message || '验证失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5',
    }}>
      <div style={{
        width: 400,
        padding: 40,
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: 32, fontSize: 24 }}>
          天枢临床决策管理系统
        </h1>

        {!totpStep ? (
          <Form onFinish={handleLogin} size="large">
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                登录
              </Button>
            </Form.Item>
            <div style={{ textAlign: 'center' }}>
              <a href="/register">患者自助注册</a>
            </div>
          </Form>
        ) : (
          <Form onFinish={handleTotpVerify} size="large">
            <Form.Item name="token" rules={[{ required: true, message: '请输入动态码' }]}>
              <Input placeholder="TOTP动态码" maxLength={6} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                验证
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
}
