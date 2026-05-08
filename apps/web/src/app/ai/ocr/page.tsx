'use client';

import React, { useState } from 'react';
import { Card, Input, Button, Table, message, Divider, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { aiService } from '@/services/ai.service';

export default function OCRPage() {
  const [text, setText] = useState('');
  const [nlpResult, setNlpResult] = useState<any>(null);
  const [nlpLoading, setNlpLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState<any>(null);
  const [ocrLoading, setOcrLoading] = useState(false);

  const handleNLP = async () => {
    if (!text.trim()) return;
    setNlpLoading(true);
    try {
      const res = await aiService.nlpStructurize(text);
      setNlpResult(res);
    } catch { message.error('结构化失败'); }
    finally { setNlpLoading(false); }
  };

  const handleOCR = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    setOcrLoading(true);
    try {
      const res = await aiService.ocrPrescription(formData);
      setOcrResult(res);
    } catch { message.error('识别失败'); }
    finally { setOcrLoading(false); }
    return false;
  };

  const drugColumns = [
    { title: '药品名', dataIndex: 'drugName', key: 'drugName' },
    { title: '规格', dataIndex: 'specification', key: 'specification' },
    { title: '用量', dataIndex: 'dosage', key: 'dosage' },
    { title: '用法', dataIndex: 'usage', key: 'usage' },
  ];

  return (
    <div>
      <Card title="NLP 文本结构化" style={{ marginBottom: 16 }}>
        <Input.TextArea rows={4} value={text} onChange={e => setText(e.target.value)} placeholder="输入病历文本..." />
        <Button type="primary" onClick={handleNLP} loading={nlpLoading} style={{ marginTop: 12 }}>解析</Button>
        {nlpResult && (
          <div style={{ marginTop: 16 }}>
            <div><strong>结构化主诉:</strong> {nlpResult.structuredComplaint}</div>
            {nlpResult.extractedSymptoms?.length > 0 && (
              <div style={{ marginTop: 8 }}><strong>症状:</strong> {nlpResult.extractedSymptoms.join(', ')}</div>
            )}
            {nlpResult.extractedHistory?.length > 0 && (
              <div style={{ marginTop: 4 }}><strong>病史:</strong> {nlpResult.extractedHistory.join(', ')}</div>
            )}
          </div>
        )}
      </Card>
      <Card title="OCR 处方识别">
        <Upload beforeUpload={handleOCR} showUploadList={false} accept="image/*">
          <Button icon={<UploadOutlined />} loading={ocrLoading}>上传处方图片</Button>
        </Upload>
        {ocrResult && (
          <div style={{ marginTop: 16 }}>
            <div style={{ marginBottom: 8 }}><strong>原始文本:</strong> {ocrResult.rawText}</div>
            <Table dataSource={ocrResult.structuredData || []} rowKey="drugName" columns={drugColumns} pagination={false} size="middle" />
          </div>
        )}
      </Card>
    </div>
  );
}
