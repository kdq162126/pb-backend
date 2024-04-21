import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlacklistEntity, WhitelistEntity } from "src/database/entities";
import { Repository } from "typeorm";
import { JudgeDto } from "./judge.dto";
import { JUDGE_RESULT } from "../../utils/const";

@Injectable()
export class JudgeService {
    constructor(
        @InjectRepository(WhitelistEntity)
        private readonly whitelistRepo: Repository<WhitelistEntity>,
        @InjectRepository(BlacklistEntity)
        private readonly blacklistRepo: Repository<BlacklistEntity>,
    ) { }

    async checklegit(dto: JudgeDto) {
        var judgeResult = JUDGE_RESULT.UNKNOWN

        const blackElm = await this.blacklistRepo.findOne({ where: { code: dto.code, platform: dto.platform } })
        if (blackElm) {
            judgeResult = JUDGE_RESULT.SCAM
            return { result: judgeResult }
        }

        // TODO: put logic for whitelist check here

        return { result: judgeResult }
    }
}