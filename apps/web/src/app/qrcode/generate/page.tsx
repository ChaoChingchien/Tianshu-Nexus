'use client';

import React, { useState } from 'react';
import { Card, Input, Button, message, Image, Slider, Space } from 'antd';
import { qrcodeService } from '@/services/qrcode.service';

export default function QRCodeGeneratePage() {
  const [content, setContent] = useState('');
  const [size, setSize] = useState(256);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!content.trim()) {
      message.warning('请输入要编码的内容');
      return;
    }
    setLoading(true);
    try {
      const res = await qrcodeService.generate({ data: content, options: { size } });
      setQrImage(res.qrcode);
    } catch { message.error('生成失败'); }
    finally { setLoading(false); }
  };

  return (
    <Card title="二维码生成">
      <div style={{ maxWidth: 400 }}>
        <Input.TextArea rows={4} value={content} onChange={e => setContent(e.target.value)} placeholder="输入要编码的文本或数据..." />
        <div style={{ marginTop: 12 }}>
          <span>尺寸: {size}px</span>
          <Slider min={128} max={512} step={32} value={size} onChange={setSize} />
        </div>
        <Button type="primary" onClick={handleGenerate} loading={loading}>生成二维码</Button>
        {qrImage && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Image src={qrImage} width={size} alt="二维码" />
          </div>
        )}
      </div>
    </Card>
  );
}
