import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterState } from '@angular/router';
import { LogService } from '@dagonmetric/ng-log';
import { PixelService } from 'ngx-pixel';
declare let fbq: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private meta: Meta,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private pixel: PixelService
  ) {
    this.handleRouteEvents();
  }

  ngOnInit(): void {
    const title = 'Noticias del mercado financiero y criptomonedas';
    this.titleService.setTitle(title);
    this.meta.addTags([
      { name: 'keywords', content: 'mercaodos, finanzas, bitcoint, btc, inversiones, noticas, mundo cripto' },
      { name: 'description', content: 'Descubre las últimas noticias financieras y de criptomonedas con análisis y actualizaciones en tiempo real. Mantente informado y toma decisiones informadas en el mercado financiero' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Arp tecnology' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2023-06-2023', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);
    this.meta.addTag({ property: 'og:title', content: 'Noticias del mercado financiero y criptomonedas' });
    this.meta.addTag({ property: 'og:description', content: "Descubre las últimas noticias financieras y de criptomonedas con análisis y actualizaciones en tiempo real. Mantente informado y toma decisiones informadas en el mercado financiero" });
    this.meta.addTag({ property: 'og:image', content: '/assets/background-form.png' });
    this.pixel.track('PageView', {
    });
  }


  handleRouteEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        this.titleService.setTitle(title);
        gtag('event', 'page_view', {
          page_title: title,
          page_path: event.urlAfterRedirects,
          page_location: this.document.location.href
        })
        fbq('track', title);
      }
    });
  }

  getTitle(state: RouterState, parent: ActivatedRoute): string[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
      data.push(parent.snapshot.data['title']);
    }
    if (state && parent && parent.firstChild) {
      data.push(...this.getTitle(state, parent.firstChild));
    }
    return data;
  }

}
