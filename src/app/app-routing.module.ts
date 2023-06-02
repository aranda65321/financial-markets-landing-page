import { FormComponent } from './Components/form/form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './common/page/body/body.component';
import { HomeComponent } from './Components/home/home.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormCardComponent } from './Components/form-card/form-card.component';
import { NewsContentComponent } from './Components/news-content/news-content.component';
import { PageViewComponent } from './Components/page-view/page-view.component';
import { DownloadComponent } from './Components/download/download.component';


const routes: Routes = [
  {
    path: '', component: BodyComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'criptomonedas', component: NewsContentComponent, data: { type: 1 } },
      { path: 'finanzas', component: NewsContentComponent, data: { type: 2 } },
      { path: 'create', component: FormCardComponent },
      { path: 'registro', component: FormComponent },
      { path: 'noticias', component: PageViewComponent},
      { path: 'descargas', component: DownloadComponent}
    ]
  },
  {
    path:'**', redirectTo:'', pathMatch:'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
