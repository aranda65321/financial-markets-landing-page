import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
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
  description: string = "";

  typePage?: number;
  isMobile = false;
  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private router: Router,
    private meta: Meta,
  ) {
    const width = window.screen.width;
    if (width <= 767) {
      this.isMobile = true;
    }
    this.route.data.subscribe((data) => {
      this.typePage = data['type'];
      if (this.typePage === 1) {
        this.title = "CRIPTOMONEDAS";
        this.description =  "Seccion para mantenerte actualizado en todos los temas de criptomonedas" ;
        this.imgPath1 = true;
      }
      if (this.typePage === 2) {
        this.title = "MERCADOS FINANCIEROS";
        this.description =  "Seccion para mantenerte actualizado en todos los temas de mercados financieros" ;
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
    this.meta.updateTag({ property: 'og:title', content: 'Realidad Mercados - ' + this.title });
    this.meta.updateTag({ property: 'og:description', content: this.description});
    this.meta.updateTag({ property: 'og:image', content: "/assets/img/bandas.jpg" });
  }

}
