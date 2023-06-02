import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { Card } from 'src/app/common/domain/models/Card';
import { PageService } from 'src/app/common/page/page.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit {
  constructor(
    private pageService: PageService,
    private router: Router
  ) { }
  isMobile = false;
  message: string = "";
  showToast: boolean = false;

  ngOnInit(): void {
    let user = prompt("User", "");
    let pass = prompt("Pass", "");
    if (environment.credentials.user !== user || pass !== environment.credentials.pass) {
      alert("Usuario no existe");
      this.router.navigate(['']);
    }

    const width = window.screen.width;
    if (width <= 767) {
      this.isMobile = true;
      return;
    }
    this.isMobile = false;
  }

  saveCard() {
    this.message = "";
    const errorMessage = this.validForm();
    if (errorMessage !== "") {
      this.message = errorMessage;
      this.showToast = true;
      return;
    }
    this.message = "Noticia creada exitosamente";
    this.createNewCard();
    this.showToast = true;
    this.cleanForm();
  }

  validForm(): string {
    let errorMessage = this.message;
    const title = $("#title").val();
    const category = $("#category").val();
    const imgUrl = $("#imgUrl").val();
    const content = $("#content").val();
    const ButtonTitle=$("#buttons").val();

    if (title === undefined || title === null || title === '') {
      errorMessage += 'Es obligatorio llenar el campo titulo \n';
    }
    if (category === undefined || category === null || category === '') {
      errorMessage += "Es obligatorio llenar la campo categoria \n";
    }
    if (imgUrl === undefined || imgUrl === null || imgUrl === '') {
      errorMessage += "Es obligatorio llenar el campo url imagen \n";
    }
    if (content === undefined || content === null || content === '') {
      errorMessage += "Es obligatorio llenar el campo contenido \n";
    }
    return errorMessage;
  }

  cleanForm() {
    $("#title").val('');
    $("#category").val('');
    $("#imgUrl").val('');
    $("#content").val('');
    $("#buttons").val('');
  }

  createNewCard() {
    const title = $("#title").val() + "";
    const category = $("#category").val() + "";
    const imgPath = $("#imgUrl").val() + "";
    const content = this.getParagraphs($("#content").val() + "");
    const creationDate = new Date().toLocaleDateString("en-US");
    const views = 0;
    const ButtonTitle =$("#buttons").val()+"";
    const card: Card = {
      title,
      category,
      imgPath,
      content,
      creationDate,
      views,
      ButtonTitle
    }
    this.pageService.createCard(card);
  }

  getParagraphs(text: string): string[] {
    let values: string[] = [];
    const arrayStrings = text.split('\n');
    for (let index = 0; index < arrayStrings.length; index++) {
      const element = arrayStrings[index];
      if (element !== '') {
        values.push(element);


      }
    }
    return values;
  }
}
