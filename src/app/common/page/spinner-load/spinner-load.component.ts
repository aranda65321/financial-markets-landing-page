import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-spinner-load',
  templateUrl: './spinner-load.component.html',
  styleUrls: ['./spinner-load.component.scss']
})
export class SpinnerLoadComponent {
  show = false;
  constructor(public loaderService: LoaderService) {
    this.loaderService.loading.subscribe({
      next: (data) => {
        this.show = data;
      }
    });
  }
}
