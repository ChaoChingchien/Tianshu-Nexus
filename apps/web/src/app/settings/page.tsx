'use client';

import React, { useEffect, useState } from 'react';
import { Card, Form, Switch, InputNumber, Input, Button, message, Spin, Divider } from 'antd';
import { settingsService } from '@/services/settings.service';

export default function SettingsPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await settingsService.getSettings();
      form.setFieldsValue(res);
    } catch { message.error('获取设置失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async (values: any) => {
    setSaving(true);
    try {
      await settingsService.updateSettings(values);
      message.success('设置已保存');
    } catch { message.error('保存失败'); }
    finally { setSaving(false); }
  };

  if (loading) return <Card><div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div></Card>;

  return (
    <Card title="系统设置">
      <Form form={form} layout="vertical" onFinish={handleSave} style={{ maxWidth: 600 }}>
        <Divider orientation="left">基础设置</Divider>
        <Form.Item name="systemName" label="系统名称"><Input /></Form.Item>
        <Form.Item name="systemDescription" label="系统描述"><Input.TextArea rows={2} /></Form.Item>

        <Divider orientation="left">安全设置</Divider>
        <Form.Item name="enableSelfRegistration" label="允许自助注册" valuePropName="checked"><Switch /></Form.Item>
        <Form.Item name="enableTwoFactorAuth" label="启用双因素认证" valuePropName="checked"><Switch /></Form.Item>
        <Form.Item name="sessionTimeoutMinutes" label="会话超时(分钟)"><InputNumber min={1} max={1440} style={{ width: '100%' }} /></Form.Item>
        <Form.Item name="maxLoginAttempts" label="最大登录尝试次数"><InputNumber min={1} max={20} style={{ width: '100%' }} /></Form.Item>

        <Divider orientation="left">审计与隐私</Divider>
        <Form.Item name="enableAuditLog" label="启用审计日志" valuePropName="checked"><Switch /></Form.Item>
        <Form.Item name="auditLogRetentionDays" label="审计日志保留天数"><InputNumber min={1} max={3650} style={{ width: '100%' }} /></Form.Item>
        <Form.Item name="enablePiiMask" label="启用PII脱敏" valuePropName="checked"><Switch /></Form.Item>

        <Divider orientation="left">其他</Divider>
        <Form.Item name="defaultLanguage" label="默认语言"><Input /></Form.Item>
        <Form.Item name="timezone" label="时区"><Input /></Form.Item>
        <Form.Item name="enableDataBackup" label="启用数据备份" valuePropName="checked"><Switch /></Form.Item>
        <Form.Item name="backupIntervalHours" label="备份间隔(小时)"><InputNumber min={1} max={168} style={{ width: '100%' }} /></Form.Item>

        <Form.Item><Button type="primary" htmlType="submit" loading={saving}>保存设置</Button></Form.Item>
      </Form>
    </Card>
  );
}
