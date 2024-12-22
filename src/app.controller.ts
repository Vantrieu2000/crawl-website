import { Controller, Get, Query } from '@nestjs/common';
import { ScraperService } from './scraper/scraper.service';

@Controller('scrape')
export class AppController {
    constructor(private readonly scraperService: ScraperService) {}

    @Get()
    async getScrapedData(@Query('url') url: string, @Query('cookie') cookie: string) {
        const data = await this.scraperService.scrapeStaticSite(url, cookie);
        return data;
    }
} 