import { Component } from '@angular/core';
import { AppApiService } from './app-api/app-api.service';
import { ScrapedImagesDTO } from './dto/scraped-images-dto';
import { CrawledPageDTO } from './dto/crawled-page-dto';
import { ScrapedPageDTO } from './dto/scraped-page-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // This is the default URL
  url = "https://example.com"

  scrapedPage: ScrapedPageDTO | undefined;
  scrapedImages: ScrapedImagesDTO | undefined;
  crawledPage: CrawledPageDTO | undefined;
  
  childScrapedPage: ScrapedPageDTO | undefined
  childScrapedImages: ScrapedImagesDTO | undefined
  constructor(private api: AppApiService) { }

  onGetTitleClick() {
    this.api.getTitle(this.url)
      .subscribe(scrapedPage => {
        this.scrapedPage = scrapedPage;
        this.scrapedImages = undefined;
        this.crawledPage = undefined;
      })
  }
  onGetImagesClick() {
    this.api.getImages(this.url)
      .subscribe(scrapedImages => {
        this.scrapedImages = scrapedImages;
        this.scrapedPage = undefined;
        this.crawledPage = undefined;
      })
  }
  onGetChildrenClick() {
    this.api.getChildren(this.url)
      .subscribe(crawledPage => {
        this.crawledPage = crawledPage;
        this.scrapedPage = undefined;
        this.scrapedImages = undefined;
        this.childScrapedImages = undefined;
        this.childScrapedPage = undefined;
      })
  }

  onChildTitleClick(childUrl: string) {
    this.api.getTitle(childUrl)
      .subscribe(childScrapedPage => {
        this.childScrapedPage = childScrapedPage;
      })
  }
  onChildImagesClick(childUrl: string) {
    this.api.getImages(childUrl)
      .subscribe(scrapedImages => {
        this.childScrapedImages = scrapedImages;
      })
  }
}
