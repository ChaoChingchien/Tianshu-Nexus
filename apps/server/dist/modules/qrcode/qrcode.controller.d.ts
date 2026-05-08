import { QrcodeService } from './qrcode.service';
export declare class QrcodeController {
    private qrcodeService;
    constructor(qrcodeService: QrcodeService);
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
//# sourceMappingURL=qrcode.controller.d.ts.map