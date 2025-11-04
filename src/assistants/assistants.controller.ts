import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AssistantsService } from './assistants.service';

@Controller('api/v1/assistants')
export class AssistantsController {
  constructor(private readonly assistantsService: AssistantsService) {}

  @Get()
  getAll() {
    return this.assistantsService.getAll();
  }

  @Post()
  create(@Body() body: { assistantId: string; name: string }) {
    return this.assistantsService.create(body);
  }

  @Put(':assistantId')
  update(@Param('assistantId') assistantId: string, @Body() body: { name: string }) {
    return this.assistantsService.update(assistantId, body.name);
  }

  @Delete(':assistantId')
  remove(@Param('assistantId') assistantId: string) {
    return this.assistantsService.remove(assistantId);
  }
}
