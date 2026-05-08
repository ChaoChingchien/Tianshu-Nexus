'use client';

import React, { useState } from 'react';
import { Card, Form, Input, Button, Table, Tag, message, Descriptions, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { aiService } from '@/services/ai.service';
import { patientsService } from '@/services/patients.service';

const riskColor: Record<string, string> = { LOW: 'green', MEDIUM: 'orange', HIGH: 'red', CRITITICAL: 'darkred' };

export default function RiskAssessmentPage() {
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!search) return;
    setSearching(true);
    try {
      const res = await patientsService.findAll({ search });
      setPatients(res.items || []);
    } catch { message.error('搜索失败'); }
    finally { setSearching(false); }
  };

  const handleAssess = async () => {
    if (!selectedPatient) return;
    setLoading(true);
    try {
      const res = await aiService.getRiskAssessment(selectedPatient.id);
      setResult(Array.isArray(res) ? res : res?.items || []);
    } catch { message.error('评估失败'); }
    finally { setLoading(false); }
  };

  const columns = [
    { title: '风险类型', dataIndex: 'riskType', key: 'riskType' },
    { title: '风险等级', dataIndex: 'riskLevel', key: 'riskLevel', render: (v: string) => <Tag color={riskColor[v] || 'default'}>{v}</Tag> },
    { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
    { title: '建议', dataIndex: 'suggestion', key: 'suggestion', ellipsis: true },
  ];

  return (
    <Card title="风险哨兵 - 风险评估">
      <div style={{ maxWidth: 600, marginBottom: 24 }}>
        <Input.Search placeholder="搜索患者" value={search} onChange={e => setSearch(e.target.value)} onSearch={handleSearch} loading={searching} />
        {patients.length > 0 && (
          <div style={{ marginTop: 8 }}>
            {patients.map((p: any) => (
              <div key={p.id} onClick={() => setSelectedPatient(p)} style={{ padding: '8px 12px', cursor: 'pointer', background: selectedPatient?.id === p.id ? '#e6f7ff' : undefined, border: '1px solid #f0f0f0', borderRadius: 4, marginBottom: 4 }}>
                {p.name} ({p.anonymousId}) - {p.diagnosis || '未诊断'}
              </div>
            ))}
          </div>
        )}
        {selectedPatient && <div style={{ marginTop: 8, color: '#1890ff' }}>已选择: {selectedPatient.name}</div>}
      </div>
      <Button type="primary" onClick={handleAssess} loading={loading} disabled={!selectedPatient}>开始评估</Button>

      {result && result.length > 0 && (
        <>
          <Divider>评估结果</Divider>
          {result.length === 1 && (
            <Descriptions column={2} style={{ marginBottom: 16 }}>
              <Descriptions.Item label="风险类型">{result[0].riskType}</Descriptions.Item>
              <Descriptions.Item label="风险等级"><Tag color={riskColor[result[0].riskLevel]}>{result[0].riskLevel}</Tag></Descriptions.Item>
              <Descriptions.Item label="总体评分" span={2}>{result[0].overallScore ?? '-'}</Descriptions.Item>
              <Descriptions.Item label="描述" span={2}>{result[0].description}</Descriptions.Item>
              <Descriptions.Item label="建议" span={2}>{result[0].suggestion}</Descriptions.Item>
            </Descriptions>
          )}
          {result.length > 1 && <Table dataSource={result} rowKey="riskType" columns={columns} pagination={false} size="middle" />}
        </>
      )}
    </Card>
  );
}
