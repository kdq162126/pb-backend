import { IsEnum, IsJSON, IsNumber, IsOptional, IsString } from "class-validator";
import { PLATFORM } from "../../utils/const";

export class JudgeDto {
    @IsString()
    code: string

    @IsEnum(PLATFORM)
    platform: PLATFORM

    @IsJSON()
    @IsOptional()
    metadata?: JSON
}