import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ImageRendererComponent } from './image-renderer/image-renderer.component';
import { EmailsRendererComponent } from './emails-renderer/emails-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageRendererComponent,
    EmailsRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
