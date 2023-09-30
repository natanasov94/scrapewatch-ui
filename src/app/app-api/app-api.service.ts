import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScrapedPageDTO } from '../dto/scraped-page-dto';
import { ScrapedImagesDTO } from '../dto/scraped-images-dto';
import { CrawledPageDTO } from '../dto/crawled-page-dto';
import { environment } from 'src/environments/environment';
import { ScrapedEmailsDTO } from '../dto/scraped-emails-dto';

@Injectable({
  providedIn: 'root'
})
export class AppApiService {

  private baseUrl: string = environment.apiUrl;
  
  constructor(private http:HttpClient) { }

  getTitle(url: string): Observable<ScrapedPageDTO> {
    return this.http.get<ScrapedPageDTO>(`${this.baseUrl}/scrape?url=${url}`)
  }

  getImages(url: string): Observable<ScrapedImagesDTO> {
    return this.http.get<ScrapedImagesDTO>(`${this.baseUrl}/scrape/image?url=${url}`)
  }

  getChildren(url: string): Observable<CrawledPageDTO> {
    return this.http.get<CrawledPageDTO>(`${this.baseUrl}/crawl?url=${url}`)
  }

  getEmails(url: string): Observable<ScrapedEmailsDTO> {
    return this.http.get<ScrapedEmailsDTO>(`${this.baseUrl}/scrape/email?url=${url}`)
  }
}
