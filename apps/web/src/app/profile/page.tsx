'use client';

import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Button, Form, Input, message, Spin, Divider, Modal } from 'antd';
import { useAuthStore } from '@/stores/authStore';
import { profileService } from '@/services/profile.service';
import { authService } from '@/services/auth.service';

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [pwModal, setPwModal] = useState(false);
  const [form] = Form.useForm();
  const [pwForm] = Form.useForm();

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await profileService.getProfile();
      setProfile(res);
    } catch { message.error('获取个人信息失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProfile(); }, []);

  const handleSave = async (values: any) => {
    try {
      await profileService.updateProfile(values);
      message.success('已更新');
      setEditing(false);
      fetchProfile();
    } catch { message.error('更新失败'); }
  };

  const handleChangePassword = async (values: any) => {
    try {
      await profileService.changePassword(values);
      message.success('密码已修改');
      setPwModal(false);
      pwForm.resetFields();
    } catch { message.error('修改失败'); }
  };

  if (loading) return <Card><div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div></Card>;

  return (
    <div>
      <Card title="个人信息" extra={<Button onClick={() => { setEditing(!editing); form.setFieldsValue(profile); }}>{editing ? '取消' : '编辑'}</Button>}>
        {editing ? (
          <Form form={form} layout="vertical" onFinish={handleSave} style={{ maxWidth: 500 }} initialValues={profile}>
            <Form.Item name="displayName" label="显示名称"><Input /></Form.Item>
            <Form.Item name="email" label="邮箱"><Input /></Form.Item>
            <Form.Item name="phone" label="手机号"><Input /></Form.Item>
            <Form.Item><Button type="primary" htmlType="submit">保存</Button></Form.Item>
          </Form>
        ) : (
          <Descriptions column={2}>
            <Descriptions.Item label="用户名">{user?.username}</Descriptions.Item>
            <Descriptions.Item label="显示名称">{profile?.displayName || user?.displayName}</Descriptions.Item>
            <Descriptions.Item label="角色">{user?.role}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{profile?.email || '-'}</Descriptions.Item>
            <Descriptions.Item label="手机号">{profile?.phone || '-'}</Descriptions.Item>
          </Descriptions>
        )}
      </Card>
      <Card title="安全设置" style={{ marginTop: 16 }}>
        <Button onClick={() => setPwModal(true)}>修改密码</Button>
      </Card>
      <Modal title="修改密码" open={pwModal} onCancel={() => { setPwModal(false); pwForm.resetFields(); }} onOk={() => pwForm.submit()}>
        <Form form={pwForm} layout="vertical" onFinish={handleChangePassword}>
          <Form.Item name="oldPassword" label="当前密码" rules={[{ required: true }]}><Input.Password /></Form.Item>
          <Form.Item name="newPassword" label="新密码" rules={[{ required: true, min: 6 }]}><Input.Password /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
