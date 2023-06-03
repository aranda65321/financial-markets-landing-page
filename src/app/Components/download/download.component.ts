import { User } from './../../common/domain/models/User';
import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/common/page/page.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Util } from 'src/app/common/utils/Utils';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
users?: User[];
formGroup: FormGroup;
  constructor(
    private pageService: PageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({});

  }


  ngOnInit(): void {
    let user = prompt("User", "");
    let pass = prompt("Pass", "");
    if (environment.credentials.user !== user || pass !== environment.credentials.pass) {
      alert("Usuario no existe");
      this.router.navigate(['']);
    }else{

        this.pageService.getAllUser().subscribe({
          next: (data) => {
            this.users = data;
            Util.getUrlDownloadCsv(Util.getDataCsv(this.users));
          },
        });
        this.router.navigate(['']);

    }
  }

}
