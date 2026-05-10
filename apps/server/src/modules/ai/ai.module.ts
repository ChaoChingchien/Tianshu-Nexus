import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { DeepSeekClientService } from '../../common/ai/deepseek-client.service';

@Module({
  controllers: [AiController],
  providers: [AiService, DeepSeekClientService],
  exports: [AiService],
})
export class AiModule {}
