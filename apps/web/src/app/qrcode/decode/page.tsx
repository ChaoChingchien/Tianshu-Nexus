'use client';

import React, { useState } from 'react';
import { Card, Upload, Button, message, Image, Input, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { qrcodeService } from '@/services/qrcode.service';

export default function QRCodeDecodePage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputImage, setInputImage] = useState('');

  const handleDecode = async (file?: File) => {
    if (!file && !inputImage) {
      message.warning('请上传二维码图片或输入图片URL');
      return;
    }
    setLoading(true);
    try {
      const imageSource = file ? URL.createObjectURL(file) : inputImage;
      if (file) setImageUrl(imageSource);
      const res = await qrcodeService.decode(imageSource);
      setResult(res.text);
    } catch { message.error('解码失败'); }
    finally { setLoading(false); }
  };

  return (
    <Card title="二维码解码">
      <Upload
        beforeUpload={(file) => { handleDecode(file); return false; }}
        showUploadList={false}
        accept="image/*"
      >
        <Button icon={<UploadOutlined />} loading={loading}>上传二维码图片</Button>
      </Upload>
      <Divider>或</Divider>
      <div style={{ maxWidth: 400 }}>
        <Input.TextArea rows={2} value={inputImage} onChange={e => setInputImage(e.target.value)} placeholder="输入图片Base64数据或URL..." />
        <Button onClick={() => handleDecode()} disabled={!inputImage} style={{ marginTop: 8 }}>解码</Button>
      </div>
      {imageUrl && (
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Image src={imageUrl} width={200} alt="上传的二维码" />
        </div>
      )}
      {result && (
        <div style={{ marginTop: 16 }}>
          <Divider>解码结果</Divider>
          <Input.TextArea rows={4} value={result} readOnly />
        </div>
      )}
    </Card>
  );
}
