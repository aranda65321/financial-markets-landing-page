import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ContentPageComponent } from './content-page/content-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoaderService } from './loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    BodyComponent,
    NavBarComponent,
    FooterComponent,
    HeaderComponent,
    ContentPageComponent,
  ],
  exports: [ContentPageComponent],
  providers: [
    LoaderService,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ]
})
export class PageModule { }
