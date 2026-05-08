'use client';

import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Tag, Button, Space, message, Spin, Tabs, Divider } from 'antd';
import { EditOutlined, ArrowLeftOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import { patientsService } from '@/services/patients.service';
import { RiskLevelLabel, PatientCategoryLabel } from '@tianshu/shared';

const riskColorMap: Record<string, string> = {
  HIGH: '#ff4d4f',
  CRITICAL: '#8B0000',
  MEDIUM: '#faad14',
  LOW: '#52c41a',
};

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<any>(null);
  const [masked, setMasked] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    patientsService.findById(id).then((res) => {
      setPatient(res);
    }).catch(() => {
      message.error('患者不存在');
      router.push('/patients');
    }).finally(() => {
      setLoading(false);
    });
  }, [params.id]);

  if (loading) return <Spin style={{ display: 'block', margin: '100px auto' }} />;
  if (!patient) return null;

  const maskPhone = (phone: string) => phone ? phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '-';
  const maskIdNumber = (id: string) => id ? id.replace(/^(.{3}).*(.{4})$/, '$1**********$2') : '-';

  return (
    <div>
      <Button icon={<ArrowLeftOutlined />} onClick={() => router.push('/patients')} style={{ marginBottom: 16 }}>
        返回患者列表
      </Button>

      <Card
        title={`患者信息 - ${patient.name}`}
        extra={
          <Space>
            <Button icon={masked ? <LockOutlined /> : <UnlockOutlined />} onClick={() => setMasked(!masked)}>
              {masked ? '脱敏展示' : '显示真实信息'}
            </Button>
            <Button type="primary" icon={<EditOutlined />} onClick={() => router.push(`/patients/${patient.id}/edit`)}>
              编辑
            </Button>
          </Space>
        }
      >
        <Descriptions column={{ xs: 1, sm: 2, md: 3 }} bordered size="small">
          <Descriptions.Item label="匿名ID">{patient.anonymousId}</Descriptions.Item>
          <Descriptions.Item label="姓名">
            {patient.name}
            {patient.riskLevel && (
              <Tag color={riskColorMap[patient.riskLevel] || 'default'} style={{ marginLeft: 8 }}>
                {RiskLevelLabel[patient.riskLevel as keyof typeof RiskLevelLabel] || patient.riskLevel}
              </Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="性别">{patient.gender || '-'}</Descriptions.Item>
          <Descriptions.Item label="年龄">{patient.age ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="科室">{patient.department || '-'}</Descriptions.Item>
          <Descriptions.Item label="床位号">{patient.bedNumber || '-'}</Descriptions.Item>
          <Descriptions.Item label="电话" span={2}>
            {masked ? maskPhone(patient.phone || '') : patient.phone || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="身份证号" span={2}>
            {masked ? maskIdNumber(patient.idNumber || '') : patient.idNumber || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="分类">
            {PatientCategoryLabel[patient.category as keyof typeof PatientCategoryLabel] || patient.category}
          </Descriptions.Item>
          <Descriptions.Item label="入院日期">
            {patient.admissionDate ? new Date(patient.admissionDate).toLocaleDateString('zh-CN') : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="诊断" span={3}>{patient.diagnosis || '-'}</Descriptions.Item>
        </Descriptions>

        {patient.riskWarning && (
          <>
            <Divider />
            <Card size="small" title="风险警告" style={{ borderColor: '#ff4d4f' }}>
              <p style={{ color: '#ff4d4f' }}>{patient.riskWarning}</p>
            </Card>
          </>
        )}
      </Card>
    </div>
  );
}
