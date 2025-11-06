import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AssistantsService, Assistant } from './assistants.service';

@Controller('api/v1/assistants')
export class AssistantsController {
  constructor(private readonly assistantsService: AssistantsService) {}

  @Get()
  getAll() {
    return this.assistantsService.getAll();
  }

  @Post()
  create(@Body() body: any) {
    const requiredKeys = ['assistantId', 'name'];
    const keys = Object.keys(body);

    if (
      !requiredKeys.every((k) => keys.includes(k)) ||
      keys.some((k) => !requiredKeys.includes(k))
    ) {
      throw new BadRequestException(
        `Body must contain only: ${requiredKeys.join(', ')}`,
      );
    }

    if (typeof body.assistantId !== 'string' || !body.assistantId.trim()) {
      throw new BadRequestException('assistantId must be a non-empty string');
    }
    if (typeof body.name !== 'string' || !body.name.trim()) {
      throw new BadRequestException('name must be a non-empty string');
    }

    const exists = this.assistantsService.findById(body.assistantId);
    if (exists) {
      throw new BadRequestException(
        `Assistant with id '${body.assistantId}' already exists`,
      );
    }

    return this.assistantsService.create(body as Assistant);
  }

  @Put(':assistantId')
  update(@Param('assistantId') assistantId: string, @Body() body: any) {
    const allowedKeys = ['name'];
    const keys = Object.keys(body);

    if (!keys.length || keys.some((k) => !allowedKeys.includes(k))) {
      throw new BadRequestException(
        `Body must contain only: ${allowedKeys.join(', ')}`,
      );
    }

    if (typeof body.name !== 'string' || !body.name.trim()) {
      throw new BadRequestException('name must be a non-empty string');
    }

    const updated = this.assistantsService.update(assistantId, body.name);
    if (!updated) {
      throw new BadRequestException(
        `Assistant with id '${assistantId}' not found`,
      );
    }
    return updated;
  }

 @Delete(':assistantId')
 remove(@Param('assistantId') assistantId: string) {
  const deleted = this.assistantsService.remove(assistantId);
  if (!deleted) {
    throw new BadRequestException(
      `Assistant with id '${assistantId}' not found`,
    );
  }
  return { message: 'Silinme başarılı' };
}

}
