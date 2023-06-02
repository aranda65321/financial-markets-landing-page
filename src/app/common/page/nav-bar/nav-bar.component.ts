import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  collapsed = true;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  buttonCollapsed() {
    if (this.collapsed == false) {
      this.collapsed = !this.collapsed;
    }
    this.showLoadSpinner();
  }

  showLoadSpinner() {
    this.loaderService.show();
    setTimeout(() => {
      this.loaderService.hide();
    },
      2000);
  }

}
