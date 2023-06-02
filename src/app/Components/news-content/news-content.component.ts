import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/common/domain/models/Card';
import { PageService } from 'src/app/common/page/page.service';
import { Util } from 'src/app/common/utils/Utils';

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.scss']
})
export class NewsContentComponent implements OnInit {
  listCards?: Card[];
  bigCard?: Card;
  title = "";
  imgPath1: boolean = false;
  imgPath2: boolean = false;

  typePage?: number;
  isMobile = false;
  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private router: Router
  ) {
    const width = window.screen.width;
    if (width <= 767) {
      this.isMobile = true;
    }
    this.route.data.subscribe((data) => {
      this.typePage = data['type'];
      if (this.typePage === 1) {
        this.title = "CRIPTOMONEDAS";
        this.imgPath1 = true;
      }
      if (this.typePage === 2) {
        this.title = "MERCADOS FINANCIEROS";
        this.imgPath2 = true;
      }
    });
    this.pageService.getAllCards().subscribe({
      next: (data) => {
        this.listCards = Util.getListOrderByCategoryAndViews(this.typePage + "", data);
        if (this.listCards.length !== 0) {
          this.bigCard = this.listCards[0];
        } else {
          this.router.navigate(['']);
        }
      },
    });
  }

  ngOnInit(): void {
  }

}
