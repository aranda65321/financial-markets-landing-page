import { Card } from './../../domain/models/Card';
import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';


@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent implements OnInit {
  BIG = "BIG";
  PORTRAIT = "PORTRAIT";
  SMALL = "SMALL";
  cards:Card[]=[];
  test:any;
  constructor(
    private pageService: PageService
  ) { }

  ngOnInit(): void {
  }

}
