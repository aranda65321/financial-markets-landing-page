import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnChanges {

  constructor(private loaderService: LoaderService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.loaderService.show();
    setTimeout(() => {
      this.loaderService.hide();
    },
      4000);
  }

  ngOnInit(): void {
    this.loaderService.show();
    setTimeout(() => {
      this.loaderService.hide();
    },
      4000);
  }

}
