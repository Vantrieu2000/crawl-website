import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ScraperService {
    async scrapeStaticSite(url: string, cookie: string): Promise<any> {
        try {
            const { data } = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Referer': 'https://example.com',
                },
            });

            const $ = cheerio.load(data);
            console.log($('.megaMenu').html());

            const result = [];
            $('.megaMenu').each((_, element) => {
                const title = $(element).find('h2').text().trim();
                const link = $(element).find('a').attr('href');
                result.push({ title, link });
            });
            
            

            return result;
        } catch (error) {
            console.error('Error scraping static site:', error.message);
            throw new Error('Failed to scrape static site');
        }
    }
}