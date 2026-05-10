import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { DeepSeekClientService } from '../../common/ai/deepseek-client.service';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private prisma: PrismaService,
    private deepseek: DeepSeekClientService,
  ) {}

  // ── HTE：异质性治疗效应预测 ──
  async hte(dto: { patientId?: string; candidateTreatments?: string[] }) {
    const patient = dto.patientId
      ? await this.prisma.patient.findUnique({
          where: { id: dto.patientId },
          select: { name: true, age: true, gender: true, diagnosis: true, department: true },
        })
      : null;

    const prompt = `你是一位临床决策支持专家。请根据以下患者信息和候选治疗方案，进行异质性治疗效果预测（HTE）。

${patient ? `患者信息：
- 诊断：${patient.diagnosis || '未知'}
- 年龄：${patient.age || '未知'}
- 性别：${patient.gender || '未知'}
- 科室：${patient.department || '未知'}` : '未提供具体患者信息。'}

候选治疗方案：
${(dto.candidateTreatments || ['方案A', '方案B']).map((t, i) => `${i + 1}. ${t}`).join('\n')}

请以JSON格式返回各方案的预测结果，包含 successRate（数字0-1）、confidenceInterval（数组[下限,上限]）、expectedDuration（字符串，如"4-6周"）、expectedCost（数字，单位元）、rationale（简短理由）。
返回格式：{ "predictions": [{ "treatmentName": "...", "successRate": 0.0, "confidenceInterval": [0.0, 0.0], "expectedDuration": "...", "expectedCost": 0, "rationale": "..." }], "doctorPatientMatchScore": 0.0, "summary": "..." }`;

    const response = await this.deepseek.chatCompletion(
      [
        { role: 'system', content: '你是一位循证医学和精准医学专家，擅长根据患者特征和治疗方案进行疗效预测。严格返回JSON格式。' },
        { role: 'user', content: prompt },
      ],
      { temperature: 0.3, maxTokens: 2048, jsonMode: true },
    );

    if (response) {
      try {
        const parsed = JSON.parse(response);
        return { success: true, data: parsed, metadata: { model: 'deepseek-chat', timestamp: new Date().toISOString() } };
      } catch {
        this.logger.warn('Failed to parse DeepSeek HTE response, falling back to mock');
      }
    }

    // Fallback to mock
    return this.mockHte(dto);
  }

  // ── 风险评估 ──
  async risk(dto: { patientId?: string; additionalInfo?: string }) {
    let patientInfo = '未提供具体患者信息。';
    if (dto.patientId) {
      const patient = await this.prisma.patient.findUnique({
        where: { id: dto.patientId },
        select: {
          name: true, age: true, gender: true, diagnosis: true,
          department: true, riskLevel: true, riskWarning: true,
        },
      });
      if (patient) {
        patientInfo = `患者信息：
- 诊断：${patient.diagnosis || '未知'}
- 年龄：${patient.age || '未知'}
- 性别：${patient.gender || '未知'}
- 科室：${patient.department || '未知'}
- 当前风险等级：${patient.riskLevel || '未评估'}
- 风险警告：${patient.riskWarning || '无'}`;
      }
    }

    const prompt = `请对以下患者进行多维度风险评估。

${patientInfo}
${dto.additionalInfo ? `补充信息：${dto.additionalInfo}` : ''}

请以JSON格式返回风险评估结果，包含：
- riskLevel：风险等级（low/medium/high/critical）
- score：风险评分（0-100）
- factors：风险因素列表，每项包含 name、weight、value、description
- suggestions：处理建议列表
- overallAssessment：整体评估描述

返回格式：{ "riskLevel": "medium", "score": 60, "factors": [...], "suggestions": [...], "overallAssessment": "..." }`;

    const response = await this.deepseek.chatCompletion(
      [
        { role: 'system', content: '你是一位临床风险评估专家，擅长对患者进行多维度风险因素分析。严格返回JSON格式。' },
        { role: 'user', content: prompt },
      ],
      { temperature: 0.3, maxTokens: 2048, jsonMode: true },
    );

    if (response) {
      try {
        const parsed = JSON.parse(response);
        return { success: true, data: parsed, metadata: { model: 'deepseek-chat', timestamp: new Date().toISOString() } };
      } catch {
        this.logger.warn('Failed to parse DeepSeek risk response, falling back to mock');
      }
    }

    return this.mockRisk(dto);
  }

  // ── NLP：自然语言处理结构化 ──
  async nlp(dto: { text?: string }) {
    const text = dto.text || '';
    if (!text.trim()) {
      return { success: false, data: null, error: 'No text provided' };
    }

    const prompt = `请对以下医疗主诉文本进行NLP结构化处理，提取关键实体和摘要。

文本：${text}

请以JSON格式返回：
- entities：实体列表，每项包含 text、type（symptom/duration/medication/anatomy/disease/other）、confidence（0-1）
- summary：一句话总结
- keywords：关键词列表
- sentiment：情感倾向（positive/negative/neutral）
- structuredFields：结构化字段，如主诉、病程、伴随症状等

返回格式：{ "entities": [...], "summary": "...", "keywords": [...], "sentiment": "...", "structuredFields": {...} }`;

    const response = await this.deepseek.chatCompletion(
      [
        { role: 'system', content: '你是一位医疗NLP专家，擅长从自由文本中提取结构化医疗信息。严格返回JSON格式。' },
        { role: 'user', content: prompt },
      ],
      { temperature: 0.2, maxTokens: 2048, jsonMode: true },
    );

    if (response) {
      try {
        const parsed = JSON.parse(response);
        return { success: true, data: parsed, metadata: { model: 'deepseek-chat', timestamp: new Date().toISOString() } };
      } catch {
        this.logger.warn('Failed to parse DeepSeek NLP response, falling back to mock');
      }
    }

    return this.mockNlp(dto);
  }

  // ── OCR：处方识别 ──
  async ocr(dto: { imageBase64?: string; imageUrl?: string }) {
    const hasImage = !!(dto.imageBase64 || dto.imageUrl);
    if (!hasImage) {
      return { success: false, data: null, error: 'No image provided' };
    }

    // Note: DeepSeek Chat supports vision, but for structured OCR we use a text-based prompt
    // with the image as a content part when imageBase64 is provided
    const hasBase64 = !!dto.imageBase64;

    if (hasBase64) {
      // Use vision model for actual OCR
      const response = await this.deepseek.chatCompletion(
        [
          {
            role: 'system',
            content: '你是一位医疗处方OCR识别专家。请从提供的处方图片中提取所有文字和结构化信息。严格返回JSON格式。',
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: '请识别这张处方图片中的内容，并以JSON格式返回：{ "text": "完整原文", "fields": [{"name": "字段名", "value": "字段值", "confidence": 0.0}], "confidence": 0.0 }' },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${dto.imageBase64}` } },
            ],
          } as any,
        ],
        { temperature: 0.1, maxTokens: 2048, jsonMode: true },
      );

      if (response) {
        try {
          return { success: true, data: JSON.parse(response), metadata: { model: 'deepseek-chat-vision', timestamp: new Date().toISOString() } };
        } catch {
          this.logger.warn('Failed to parse DeepSeek OCR response, falling back to mock');
        }
      }
    }

    return this.mockOcr(dto);
  }

  // ── Mock fallbacks（仅用于分析占位，不含真实病历数据）──
  private mockHte(dto: any) {
    return {
      success: true,
      data: {
        predictions: (dto.candidateTreatments || ['方案A', '方案B']).map((name: string, i: number) => ({
          treatmentName: name,
          successRate: 'N/A',
          confidenceInterval: 'N/A',
          expectedDuration: 'N/A',
          expectedCost: 'N/A',
          rationale: '[MOCK] 请在 .env 中配置 DEEPSEEK_API_KEY 以启用真实 AI 疗效预测',
        })),
        doctorPatientMatchScore: null,
        summary: '[MOCK] AI 分析模块未启用 — 当前返回占位数据。配置 DEEPSEEK_API_KEY 后自动切换为 DeepSeek 模型预测。',
      },
      metadata: { model: 'mock-placeholder', timestamp: new Date().toISOString(), _warning: 'mock' },
    };
  }

  private mockRisk(dto: any) {
    return {
      success: true,
      data: {
        riskLevel: null,
        score: null,
        factors: [],
        suggestions: [],
        overallAssessment: '[MOCK] AI 风险分析模块未启用。配置 DEEPSEEK_API_KEY 后自动切换为 DeepSeek 多维度风险评估。',
      },
      metadata: { model: 'mock-placeholder', timestamp: new Date().toISOString(), _warning: 'mock' },
    };
  }

  private mockNlp(dto: any) {
    return {
      success: true,
      data: {
        entities: [],
        summary: '[MOCK] NLP 结构化模块未启用。配置 DEEPSEEK_API_KEY 后自动切换为 DeepSeek 语义分析。',
        keywords: [],
        sentiment: null,
        structuredFields: {},
        _inputPreview: dto.text ? dto.text.slice(0, 80) : null,
      },
      metadata: { model: 'mock-placeholder', timestamp: new Date().toISOString(), _warning: 'mock' },
    };
  }

  private mockOcr(dto: any) {
    return {
      success: true,
      data: {
        text: null,
        confidence: null,
        fields: [],
        _imageProvided: !!(dto.imageBase64 || dto.imageUrl),
        _hint: '[MOCK] OCR 识别模块未启用。配置 DEEPSEEK_API_KEY 并上传真实处方图片以启用 AI 处方识别。',
      },
      metadata: { model: 'mock-placeholder', timestamp: new Date().toISOString(), _warning: 'mock' },
    };
  }
}
