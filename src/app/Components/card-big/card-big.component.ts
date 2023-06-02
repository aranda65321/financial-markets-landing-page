import { Router } from '@angular/router';
import { Card } from './../../common/domain/models/Card';
import { Component, Input, OnInit } from '@angular/core';
import { Util } from 'src/app/common/utils/Utils';

@Component({
  selector: 'app-card-big',
  templateUrl: './card-big.component.html',
  styleUrls: ['./card-big.component.scss'],
})
export class CardBigComponent implements OnInit {
  @Input() typeCard?: string;
  @Input() dataCard?: Card;
  isBig: boolean = false;
  isPortrait: boolean = false;
  isSmall: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    switch (this.typeCard) {
      case 'BIG':
        this.isBig = true;
        break;
      case 'PORTRAIT':
        this.isPortrait = true;
        break;
      case 'SMALL':
        this.isSmall = true;
        break;
    }
  }

  loadDetail() {
    this.router.navigate(['noticias'], {
      queryParams: { id: this.dataCard?.id },
    }).then(() => {
      window.location.reload();
    });
  }

  getPrettyText(value?: string[]) {
    if (value != undefined) {
      for (let index = 0; index < value.length; index++) {
        value[index] = Util.getTextDecorateStrong(value[index], '*/', '/*');;
      }
      return value;
    }
    return value;
  }
}
