import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BodyComponent } from './body/body.component';
import { ContentPageComponent } from './content-page/content-page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoaderService } from './loader.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';


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
