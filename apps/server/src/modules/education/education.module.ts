import { Module } from '@nestjs/common';
import { ArticlesController } from './controllers/articles.controller';
import { PatientGroupsController } from './controllers/patient-groups.controller';
import { ArticlesService } from './services/articles.service';
import { PatientGroupsService } from './services/patient-groups.service';

@Module({
  controllers: [ArticlesController, PatientGroupsController],
  providers: [ArticlesService, PatientGroupsService],
  exports: [ArticlesService, PatientGroupsService],
})
export class EducationModule {}
