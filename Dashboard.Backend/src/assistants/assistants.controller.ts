import { Controller, Get } from '@nestjs/common';
import { AssistantsService } from './assistants.service';

@Controller('api/v1/assistants')
export class AssistantsController {
  constructor(private readonly assistantsService: AssistantsService) {}

  @Get()
  findAll() {
    return this.assistantsService.findAll();
  }
}
