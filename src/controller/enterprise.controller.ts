import { Controller, Get, Res, Render } from '@nestjs/common';
import { Response, response } from 'express';
import * as path from 'path';

@Controller()
export class EnterpriseController {

    @Get('/')
    @Render('index')
    root(){
        return {message: "Helolo"};
    }
}
