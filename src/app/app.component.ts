import { Component } from '@angular/core';
import { AppApiService } from './app-api/app-api.service';
import { ScrapedImagesDTO } from './dto/scraped-images-dto';
import { ScrapedPageDTO } from './dto/scraped-page-dto';
import { ScrapedEmailsDTO } from './dto/scraped-emails-dto';

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
  scrapedEmails: ScrapedEmailsDTO | undefined;

  childPages!: string[];
  childData: Map<number, ChildPageData> = new Map<number, ChildPageData>();
  constructor(private api: AppApiService) { }

  onGetTitleClick() {
    this.api.getTitle(this.url)
      .subscribe(scrapedPage => {
        this.scrapedPage = scrapedPage;
        this.scrapedImages = undefined;
        this.scrapedEmails = undefined;
        this.childPages = [];
        this.childData = new Map<number, ChildPageData>();
      })
  }
  onGetImagesClick() {
    this.api.getImages(this.url)
      .subscribe(scrapedImages => {
        this.scrapedImages = scrapedImages;
        this.scrapedPage = undefined;
        this.scrapedEmails = undefined;
        this.childPages = [];
        this.childData = new Map<number, ChildPageData>();
      })
  }
  onGetChildrenClick() {
    this.api.getChildren(this.url)
      .subscribe(crawledPage => {
        this.childPages = crawledPage.childPages;
        this.scrapedPage = undefined;
        this.scrapedImages = undefined;
        this.scrapedEmails = undefined;
        this.childData = new Map<number, ChildPageData>();
      })
  }

  onGetEmailsClick() {
    this.api.getEmails(this.url)
      .subscribe(scrapedEmails => {
        this.scrapedEmails = scrapedEmails;
        this.scrapedPage = undefined;
        this.scrapedImages = undefined;
        this.childPages = [];
        this.childData = new Map<number, ChildPageData>();
      })
  }

  onChildTitleClick(childUrl: string, index: number) {
    this.api.getTitle(childUrl)
      .subscribe(childScrapedPage => {
        this.childData.set(index,
          {
            title: childScrapedPage.title,
            images: this.childData.get(index)?.images ?? [],
            emails: this.childData.get(index)?.emails ?? []
          });
      })
  }

  onChildImagesClick(childUrl: string, index: number) {
    this.api.getImages(childUrl)
      .subscribe(scrapedImages => {
        this.childData.set(index,
          {
            title: this.childData.get(index)?.title ?? "",
            images: scrapedImages.images,
            emails: this.childData.get(index)?.emails ?? []
          });
      })
  }

  onChildEmailsClick(childUrl: string, index: number) {
    this.api.getEmails(childUrl)
      .subscribe(scrapedEmails => {
        this.childData.set(index,
          {
            title: this.childData.get(index)?.title ?? "",
            images: this.childData.get(index)?.images ?? [],
            emails: scrapedEmails.emails
          });
      })
  }

  onChildClearClick(index: number) {
    this.childData.delete(index);
  }
}

interface ChildPageData {
  title: string;
  images: string[];
  emails: string[];
}
