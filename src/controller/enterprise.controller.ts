import { Controller, Get, Post, Res, Render, Inject, Body } from '@nestjs/common';
import { Response, response } from 'express';
import * as path from 'path';
import { Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntityRepository } from 'src/dto/user.repositoy';
import { EnterpriseEntityRepository } from 'src/dto/enterprise.repository';
import base58 from 'bs58';
import nacl from 'tweetnacl';
import { WebsiteEntityRepository } from 'src/dto/website.repository';
import { WebsiteEntity } from 'src/database/entities';

@Controller()
export class EnterpriseController {

    constructor(
        private readonly userRepository: UserEntityRepository,
        private readonly enterpriseRepositoy: EnterpriseEntityRepository,
        private readonly websiteRepository: WebsiteEntityRepository
    ){}

    @Post('/verify')
    verify_message(@Session() session: Record<string, any>, @Body() credentials: {public_key: string, signature: string}){

        const user = session.user;
        const {public_key, signature} = credentials;

        const verified = nacl 
                         .sign
                         .detached
                         .verify(
                            new TextEncoder().encode(user.message),
                            base58.decode(signature),
                            base58.decode(public_key),
                         )
        
        if(verified){
            return {message: "Verified the signature"};
        }else{
            return {message: "Cannot verify the signature"};
        }
    }

    @Post('/phising')
    async phishblock(@Body() credentials: {url: string}){
        const {url} = credentials;

        const m = url.length;
        const websites = await this.websiteRepository.find();

        for(const website of websites){
            const url2 = website.websiteName;
            const n = url2.length;

            let dp: number[][] = [];
            for(let i = 1; i <= m; i++){
                for(let j = 1; j <= n; j++){
                    if(url.charAt(i-1) == url2.charAt(j-1)){
                        dp[i][j] = dp[i-1][j-1] + 1;
                    }else{
                        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                    }
                }
            }

            let delChars = 0;
            let addChars = 0;
            let i = m;
            let j = n;

            while(i > 0 || j > 0){
                if(i > 0 && j > 0 && url.charAt(i-1) === url2.charAt(j-1)){
                    i -= 1;
                    j--;
                }else{
                    delChars ++;
                    i--;
                }
            }

            let maxLen = Math.max(m, n);
            let threshold = 0.2;
            let a = (Math.max(addChars, delChars) > maxLen * threshold || Math.max(addChars, delChars) == 0) ? 1 : 0;
            if(a == 0){
                const websiteName = url2;
                const enterpriseName = this.enterpriseRepositoy.findByWebsiteName(websiteName);
                const websiteMint = this.websiteRepository.findMintByWebsiteName(websiteName);
                const data = {websiteName, enterpriseName, websiteMint}

                return response.json(data);
            }
        }

        const data = null;
        return response.json(data);

    }

    
}
