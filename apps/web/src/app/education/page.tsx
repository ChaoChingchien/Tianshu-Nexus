'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, Tabs, Input, Button, Modal, Form, Select, message, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { educationService } from '@/services/education.service';
import { ArticleStatusLabel, ArticleStatus } from '@tianshu/shared';
import dayjs from 'dayjs';

const statusColor: Record<string, string> = { DRAFT: 'default', PENDING_REVIEW: 'orange', PUBLISHED: 'green', REJECTED: 'red' };

export default function EducationPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await educationService.getArticles({ status: status || undefined, search });
      setData(res.items || []);
    } catch { message.error('获取失败'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [status]);

  const handleCreate = async (values: any) => {
    try {
      await educationService.createArticle(values);
      message.success('文章已创建');
      setModalOpen(false);
      form.resetFields();
      fetch();
    } catch { message.error('创建失败'); }
  };

  return (
    <Card title="健康宣教" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>新建文章</Button>}>
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="搜索文章标题" prefix={<SearchOutlined />} value={search} onChange={e => setSearch(e.target.value)} onPressEnter={() => { fetch(); }} style={{ width: 250 }} allowClear />
      </div>
      <Tabs activeKey={status} onChange={setStatus} items={[
        { key: '', label: '全部' },
        ...Object.entries(ArticleStatusLabel).map(([k, v]) => ({ key: k, label: v })),
      ]} />
      <Table dataSource={data} rowKey="id" loading={loading} columns={[
        { title: '标题', dataIndex: 'title', key: 'title' },
        { title: '分类', dataIndex: 'category', key: 'category' },
        { title: '状态', dataIndex: 'status', key: 'status', render: (v: string) => <Tag color={statusColor[v]}>{ArticleStatusLabel[v as keyof typeof ArticleStatusLabel] || v}</Tag> },
        { title: '浏览量', dataIndex: 'viewCount', key: 'viewCount' },
        { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', render: (v: string) => dayjs(v).format('YYYY-MM-DD') },
      ]} pagination={{ pageSize: 20 }} size="middle" />

      <Modal title="新建文章" open={modalOpen} onCancel={() => { setModalOpen(false); form.resetFields(); }} onOk={() => form.submit()} width={700}>
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item name="title" label="标题" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="category" label="分类" rules={[{ required: true }]}>
            <Select>{['饮食', '运动', '心理', '作息', '疾病知识'].map(c => <Select.Option key={c} value={c}>{c}</Select.Option>)}</Select>
          </Form.Item>
          <Form.Item name="tags" label="标签"><Input placeholder="逗号分隔" /></Form.Item>
          <Form.Item name="content" label="内容" rules={[{ required: true }]}>
            <Input.TextArea rows={8} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
