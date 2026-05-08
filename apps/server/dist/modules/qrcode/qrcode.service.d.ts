import { PrismaService } from '../../common/prisma/prisma.service';
export declare class QrcodeService {
    private prisma;
    constructor(prisma: PrismaService);
    generate(dto: {
        data: string;
        options?: any;
    }): Promise<{
        success: boolean;
        data: {
            content: string;
            qrcode: string;
            format: string;
            size: any;
        };
    }>;
    decode(dto: {
        image: string;
    }): Promise<{
        success: boolean;
        data: {
            text: string;
            format: string;
        };
    }>;
}
//# sourceMappingURL=qrcode.service.d.ts.map