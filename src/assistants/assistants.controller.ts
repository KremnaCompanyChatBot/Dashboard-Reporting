import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post 
} from '@nestjs/common';
import { AssistantsService } from './assistants.service';
import { Assistant } from './assistant.entity'; // DOĞRU IMPORT BURASI

@Controller('assistants')
export class AssistantsController {
  constructor(private readonly assistantsService: AssistantsService) {}

  @Get()
  getAll() {
    // Service'deki metod ismi 'findAll'
    return this.assistantsService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    // Service'deki metod ismi 'findOne'
    return this.assistantsService.findOne(id);
  }

  @Post()
  createAssistant(@Body() body: Partial<Assistant>) {
    return this.assistantsService.create(body);
  }

  @Patch('/:id')
  updateAssistant(
    @Param('id') id: string,
    @Body() body: Partial<Assistant>,
  ) {
    return this.assistantsService.update(id, body);
  }

  @Delete('/:id')
  deleteAssistant(@Param('id') id: string) {
    return this.assistantsService.remove(id);
  }
}