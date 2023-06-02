import { Component, OnInit } from '@angular/core';
import { LoaderService } from './common/page/loader.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private loaderService: LoaderService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    const title = 'Realidad mercados financieros';
    this.title.setTitle(title);
    this.meta.addTags([
      {name: 'keywords', content: 'mercaodos, finanzas, bitcoint, btc, inversiones, noticas, mundo cripto'},
      {name: 'description', content: 'Un sitio web dedicado completamente a informar sobre las noticias y acontecimientos mas importantes que influyen en la economia mundial'},
      {name: 'robots', content: 'index, follow'},
      { name: 'author', content: 'Arp tecnology' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2023-06-2023', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);
  }
}
