'use client';

import React, { useState } from 'react';
import { Card, Form, Select, Input, Button, Table, message, Spin, Divider, InputNumber } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { aiService } from '@/services/ai.service';
import { patientsService } from '@/services/patients.service';

export default function HTEPage() {
  const [patientSearch, setPatientSearch] = useState('');
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [treatments, setTreatments] = useState<string[]>(['']);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearchPatient = async () => {
    if (!patientSearch) return;
    setSearching(true);
    try {
      const res = await patientsService.findAll({ search: patientSearch });
      setPatients(res.items || []);
    } catch { message.error('搜索失败'); }
    finally { setSearching(false); }
  };

  const handlePredict = async () => {
    if (!selectedPatient || treatments.filter(Boolean).length === 0) {
      message.warning('请选择患者并输入至少一个治疗方案');
      return;
    }
    setLoading(true);
    try {
      const res = await aiService.getHTEPrediction({
        patientId: selectedPatient.id,
        candidateTreatments: treatments.filter(Boolean),
      });
      setResult(res);
    } catch { message.error('预测失败'); }
    finally { setLoading(false); }
  };

  const predictionColumns = [
    { title: '治疗方案', dataIndex: 'treatmentName', key: 'treatmentName' },
    { title: '成功率', dataIndex: 'successRate', key: 'successRate', render: (v: number) => `${(v * 100).toFixed(1)}%` },
    { title: '置信区间', dataIndex: 'confidenceInterval', key: 'confidenceInterval', render: (v: [number, number]) => v ? `[${(v[0] * 100).toFixed(1)}%, ${(v[1] * 100).toFixed(1)}%]` : '-' },
    { title: '预期周期', dataIndex: 'expectedDuration', key: 'expectedDuration' },
    { title: '预期费用', dataIndex: 'expectedCost', key: 'expectedCost', render: (v: number) => v ? `¥${v.toLocaleString()}` : '-' },
  ];

  return (
    <Card title="HTE 异质性治疗效果预测">
      <div style={{ maxWidth: 600, marginBottom: 24 }}>
        <Input.Search placeholder="搜索患者姓名/ID" value={patientSearch} onChange={e => setPatientSearch(e.target.value)} onSearch={handleSearchPatient} loading={searching} />
        {patients.length > 0 && (
          <div style={{ marginTop: 8 }}>
            {patients.map((p: any) => (
              <div key={p.id} onClick={() => setSelectedPatient(p)} style={{ padding: '8px 12px', cursor: 'pointer', background: selectedPatient?.id === p.id ? '#e6f7ff' : undefined, border: '1px solid #f0f0f0', borderRadius: 4, marginBottom: 4 }}>
                {p.name} ({p.anonymousId}) - {p.diagnosis || '未诊断'}
              </div>
            ))}
          </div>
        )}
        {selectedPatient && <div style={{ marginTop: 8, color: '#1890ff' }}>已选择: {selectedPatient.name} ({selectedPatient.anonymousId})</div>}
      </div>

      <Divider>候选治疗方案</Divider>
      {treatments.map((t, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, maxWidth: 500 }}>
          <Input placeholder={`治疗方案 ${i + 1}`} value={t} onChange={e => { const next = [...treatments]; next[i] = e.target.value; setTreatments(next); }} />
          {treatments.length > 1 && <Button onClick={() => setTreatments(treatments.filter((_, j) => j !== i))}>删除</Button>}
        </div>
      ))}
      <Button type="dashed" onClick={() => setTreatments([...treatments, ''])} style={{ marginBottom: 16 }}>添加方案</Button>
      <br />
      <Button type="primary" onClick={handlePredict} loading={loading} disabled={!selectedPatient}>开始预测</Button>

      {result && (
        <>
          <Divider>预测结果</Divider>
          <Table dataSource={result.predictions || []} rowKey="treatmentName" columns={predictionColumns} pagination={false} size="middle" />
          {result.doctorPatientMatchScore !== undefined && (
            <div style={{ marginTop: 12 }}>医患匹配度: {(result.doctorPatientMatchScore * 100).toFixed(1)}%</div>
          )}
        </>
      )}
    </Card>
  );
}
