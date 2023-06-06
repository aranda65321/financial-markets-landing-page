import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { User } from 'src/app/common/domain/models/User';
import { Util } from 'src/app/common/utils/Utils';
import { PageService } from './../../common/page/page.service';
import { Country } from 'src/app/common/domain/models/country';
import { COUNTRIES_DB_ES } from 'src/app/common/domain/models/countries';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Meta } from '@angular/platform-browser';

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
  message: string = 'Usuario registrado exitosamente';
  countries: Country[];
  preferredCountries: CountryISO[] = [CountryISO.Colombia, CountryISO.UnitedStates];
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;

  constructor(
    private pageService: PageService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private meta: Meta,
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
    this.meta.updateTag({ property: 'og:title', content: 'Registrate' });
    this.meta.updateTag({ property: 'og:description', content: "Registrate para brindarte asesoria" });
    this.meta.updateTag({ property: 'og:image', content: "/assets/img/bandas.jpg" });
    this.formGroup = this.formBuilder.group({
      formInput: ['', Validators.required],
      formInput4: ['', Validators.required],
      formInput2: ['', [Validators.required]],
      formInput3: ['', [Validators.required, Validators.email]],
    });

  }

  registerUser() {
    this.isEventRegister = true;
    if (!this.formGroup.invalid) {
      this.isEventRegister = false;
      const name = $('#formInput').val() + '';
      const pais = $('#formInput4').val() + '';
      const mail = $('#formInput3').val() + '';
      const telephone = this.formGroup.controls['formInput2'].value['e164Number'] + '';
      const date = new Date().toLocaleDateString('en-US');
      const user: User = {
        name,
        pais,
        mail,
        telephone,
        creationDate: date,
      };
      this.pageService.createUser(user);
      this.cleanForm();
      this.openSnackBar("Registro exitoso", "Continuar")


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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
    });
  }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.Colombia, CountryISO.UnitedArabEmirates];
  }
}
