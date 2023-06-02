import { Component, OnInit } from '@angular/core';
import { PageService } from '../../common/page/page.service';
import { Card } from '../../common/domain/models/Card';
import { Util } from '../../common/utils/Utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss'],
})
export class PageViewComponent implements OnInit {
  BIG = 'BIG';
  PORTRAIT = 'PORTRAIT';
  SMALL = 'SMALL';
  cards: Card[] = [];
  test: any;
  idCard?: string;
  isMobile = false;
  card: Card = {};
  constructor(
    private pageService: PageService,
    private routes: ActivatedRoute,
    private router: Router
  ) {
    this.routes.queryParams.subscribe({
      next: (data) => {
        this.idCard = data['id'];
      },
    });
    this.pageService.getAllCards().subscribe({
      next: (data) => {
        this.cards = Util.orderListCardByViews(data);
        if (this.cards.length !== 0 && this.idCard !== undefined && this.idCard !== '') {
          this.card = Util.filterCardById(this.idCard, this.cards);
        } else {
          this.router.navigate(['']);
        }
      }
    });
  }

  ngOnInit(): void {
    const width = window.screen.width;
    if (width <= 767) {
      this.isMobile = true;
      return;
    }
    this.isMobile = false;
  }

  getPrettyText(value:string){
    return Util.getTextDecorateStrong(value, '*/','/*');
  }
}
