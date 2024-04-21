import { JudgeDto } from './judge.dto';
import { JudgeService } from './judge.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('judge')
export class JudgeController {
  constructor(private judgeService: JudgeService) {}

  @Post()
  async judge(@Body() dto: JudgeDto) {
    return await this.judgeService.checklegit(dto);
  }
}
