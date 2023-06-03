import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterState } from '@angular/router';
import { filter } from 'rxjs/operators';

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
    private titleService: Title
  ) {
    this.handleRouteEvents();
  }

  ngOnInit(): void {
    const title = 'Realidad mercados financieros';
    this.titleService.setTitle(title);
    this.meta.addTags([
      { name: 'keywords', content: 'mercaodos, finanzas, bitcoint, btc, inversiones, noticas, mundo cripto' },
      { name: 'description', content: 'Un sitio web dedicado completamente a informar sobre las noticias y acontecimientos mas importantes que influyen en la economia mundial' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Arp tecnology' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2023-06-2023', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);
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
