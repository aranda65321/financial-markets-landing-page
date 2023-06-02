import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/common/domain/models/Card';
import { PageService } from 'src/app/common/page/page.service';
import { Util } from 'src/app/common/utils/Utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  BIG = "BIG";
  PORTRAIT = "PORTRAIT";
  SMALL = "SMALL";
  cards: Card[] = [];
  cardsCripto: Card[] = [];
  cardsMercados: Card[] = [];
  test: any;

  isMobile = false;
  card1: Card = {};
  card2: Card = {};
  constructor(
    private pageService: PageService
  ) {
    this.pageService.getAllCards().subscribe({
      next: (data) => {
        this.cards = data;
        this.cardsCripto = Util.getListOrderByCategoryAndViews('1', data);
        this.cardsMercados = Util.getListOrderByCategoryAndViews('2', data);
        if (this.cardsCripto.length > 0) {
          this.card1 = this.cardsCripto[0];
        }
        if (this.cardsMercados.length > 0) {
          this.card2 = this.cardsMercados[0];
        }
      },
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
}
