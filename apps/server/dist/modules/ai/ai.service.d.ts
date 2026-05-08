import { PrismaService } from '../../common/prisma/prisma.service';
export declare class AiService {
    private prisma;
    constructor(prisma: PrismaService);
    hte(dto: any): Promise<{
        success: boolean;
        data: {
            treatmentEffect: number;
            confidence: number;
            subgroups: {
                group: string;
                effect: number;
                size: number;
            }[];
            recommendations: string[];
        };
        metadata: {
            model: string;
            timestamp: string;
        };
    }>;
    risk(dto: any): Promise<{
        success: boolean;
        data: {
            riskLevel: string;
            score: number;
            factors: {
                name: string;
                weight: number;
                value: string;
            }[];
            suggestions: string[];
        };
        metadata: {
            model: string;
            timestamp: string;
        };
    }>;
    nlp(dto: any): Promise<{
        success: boolean;
        data: {
            entities: {
                text: string;
                type: string;
                confidence: number;
            }[];
            summary: string;
            keywords: string[];
            sentiment: string;
        };
        metadata: {
            model: string;
            timestamp: string;
        };
    }>;
    ocr(dto: any): Promise<{
        success: boolean;
        data: {
            text: string;
            confidence: number;
            fields: {
                name: string;
                value: string;
                confidence: number;
            }[];
        };
        metadata: {
            model: string;
            timestamp: string;
        };
    }>;
}
//# sourceMappingURL=ai.service.d.ts.map