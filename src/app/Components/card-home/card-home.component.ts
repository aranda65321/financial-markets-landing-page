import { Component, Input, OnInit } from '@angular/core';
import { Card } from './../../common/domain/models/Card';
import { Util } from 'src/app/common/utils/Utils';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.scss']
})
export class CardHomeComponent implements OnInit {
  @Input() typeView?: number = 2;
  @Input() data: Card = {};

  isMobile = false;
  constructor(
    private meta: Meta,
  ) { }

  ngOnInit(): void {
    const width = window.screen.width;
    if (width <= 767) {
      this.isMobile = true;
      return;
    }
    this.isMobile = false;

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
