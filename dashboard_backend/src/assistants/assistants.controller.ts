import { Controller, Get, Post, Body, UseGuards, Request, Patch, Param, Delete } from '@nestjs/common';
import { AssistantsService } from './assistants.service';
import { AuthGuard } from '@nestjs/passport'; // JWT Koruması

@Controller('assistants')
@UseGuards(AuthGuard('jwt')) // <-- TÜM METODLARI KORU
export class AssistantsController {
  constructor(private readonly assistantsService: AssistantsService) {}

  @Get()
  findAll(@Request() req) {
    // Token'dan gelen userId'yi gönderiyoruz
    return this.assistantsService.findAll(req.user.userId);
  }

  @Post()
  create(@Body() body, @Request() req) {
    // Body + UserId
    return this.assistantsService.create(body, req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.assistantsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assistantsService.delete(id);
  }
}