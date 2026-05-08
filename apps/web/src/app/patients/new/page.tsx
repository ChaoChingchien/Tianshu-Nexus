'use client';

import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Select, DatePicker, Button, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import { patientsService } from '@/services/patients.service';
import { PatientCategory, PatientCategoryLabel } from '@tianshu/shared';
import dayjs from 'dayjs';

export default function PatientFormPage() {
  const params = useParams();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const isEdit = !!params.id;

  useEffect(() => {
    if (isEdit) {
      setFetching(true);
      patientsService.findById(params.id as string).then((res) => {
        form.setFieldsValue({
          ...res,
          admissionDate: res.admissionDate ? dayjs(res.admissionDate) : undefined,
        });
      }).catch(() => {
        message.error('患者不存在');
        router.push('/patients');
      }).finally(() => setFetching(false));
    }
  }, [params.id]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        admissionDate: values.admissionDate?.toISOString(),
      };

      if (isEdit) {
        await patientsService.update(params.id as string, payload);
        message.success('患者信息已更新');
      } else {
        await patientsService.create(payload);
        message.success('患者已创建');
      }
      router.push('/patients');
    } catch {
      message.error(isEdit ? '更新失败' : '创建失败');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Spin style={{ display: 'block', margin: '100px auto' }} />;

  return (
    <div>
      <Button icon={<ArrowLeftOutlined />} onClick={() => router.push('/patients')} style={{ marginBottom: 16 }}>
        返回患者列表
      </Button>
      <Card title={isEdit ? '编辑患者' : '新建患者'}>
        <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ maxWidth: 600 }}>
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="性别">
            <Select>
              <Select.Option value="男">男</Select.Option>
              <Select.Option value="女">女</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="age" label="年龄">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="phone" label="联系电话">
            <Input />
          </Form.Item>
          <Form.Item name="idNumber" label="身份证号">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="地址">
            <Input />
          </Form.Item>
          <Form.Item name="department" label="科室">
            <Input />
          </Form.Item>
          <Form.Item name="bedNumber" label="床位号">
            <Input />
          </Form.Item>
          <Form.Item name="diagnosis" label="诊断">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="admissionDate" label="入院日期">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="category" label="患者分类" initialValue={PatientCategory.INPATIENT}>
            <Select>
              {Object.entries(PatientCategoryLabel).map(([key, label]) => (
                <Select.Option key={key} value={key}>{label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="notes" label="备注">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isEdit ? '保存修改' : '创建患者'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
