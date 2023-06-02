import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { User } from 'src/app/common/domain/models/User';
import { Util } from 'src/app/common/utils/Utils';
import { PageService } from './../../common/page/page.service';
import { Country } from 'src/app/common/domain/models/country';
import { COUNTRIES_DB_ES } from 'src/app/common/domain/models/countries';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  users?: User[];
  isMobile = false;
  formGroup: FormGroup;
  isEventRegister: boolean = false;
  showToast: boolean = false;
  message: string = 'Usuario registrado exitosamente';
  countries: Country[];

  constructor(
    private pageService: PageService,
    private formBuilder: FormBuilder
  ) {
    this.countries = COUNTRIES_DB_ES;
    this.formGroup = this.formBuilder.group({
      formInput: ['', Validators.required],
      formInput4: ['', Validators.required],
      formInput2: ['', Validators.required],
      formInput3: ['', Validators.required, Validators.email],
    });

    this.pageService.getAllUser().subscribe({
      next: (data) => {
        this.users = data;
      },
    });
    const width = window.screen.width;
    if (width <= 767) {
      this.isMobile = true;
    }
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      formInput: ['', Validators.required],
      formInput4: ['', Validators.required],
      formInput2: ['', [Validators.required, Validators.pattern(/^([+0-9])*$/)]],
      formInput3: ['', [Validators.required, Validators.email]],
    });
  }

  registerUser() {
    this.isEventRegister = true;
    if (!this.formGroup.invalid) {
      debugger
      this.isEventRegister = false;
      const name = $('#formInput').val() + '';
      const pais = $('#formInput4').val() + '';
      const mail = $('#formInput3').val() + '';
      const telephone = this.formGroup.controls['formInput2'].value + '';
      const date = new Date().toLocaleDateString('en-US');
      const user: User = {
        name,
        pais,
        mail,
        telephone,
        creationDate: date,
      };
      this.pageService.createUser(user);
      this.showToast = true;
      this.cleanForm();


    }
  }

  cleanForm() {
    this.formGroup.reset();
  }

  downloadUsers() {
    if (this.users !== undefined) {
      Util.getUrlDownloadCsv(Util.getDataCsv(this.users));
    }
  }
}