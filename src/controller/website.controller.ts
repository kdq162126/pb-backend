import { Controller, Get, Res, Render } from '@nestjs/common';


@Controller()
export class WebsiteController {

    @Get('/register')
    @Render('register')
    root(){
        return {message: "Helolo"};
    }
}
