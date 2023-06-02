import { Card } from '../domain/models/Card';
import { User } from '../domain/models/User';

export class Util {

  static orderListCardByViews(listCard: Card[]): Card[] {
    if (listCard !== undefined && listCard !== null) {
      const size = listCard.length;
      const aux: Card[] = [];
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - 1 - i; j++) {
          let view1 = listCard[j].views;
          let view2 = listCard[j + 1].views;
          if (view1 !== undefined && view2 !== undefined)
            if (view1 > view2) {
              [listCard[j], listCard[j + 1]] = [listCard[j + 1], listCard[j]];
            }
        }
      }
    }
    return listCard;
  }

  static getListOrderByCategoryAndViews(category: string, listCard: Card[]): Card[] {
    listCard = this.orderListCardByViews(listCard);
    let categoryList: Card[] = [];
    for (let index = 0; index < listCard.length; index++) {
      const card = listCard[index];
      if (card.category === category) {
        categoryList.push(card);
      }
    }
    return categoryList;
  }


  static getDataCsv(listUser: User[]) {
    let data = 'nombre, correo, telefono, fecha de registro \n';
    for (let index = 0; index < listUser.length; index++) {
      const element = listUser[index];
      data += element.name + ',' + element.mail + ',' + element.telephone + ',' + element.creationDate + '\n';
    }
    return data;
  }

  static getUrlDownloadCsv(data: string) {
    const filePath = window.URL.createObjectURL(new Blob(Array.from(data)));
    const link = document.createElement('a');
    link.href = filePath;
    link.setAttribute('download', "listadoUsuarios.csv");
    document.body.appendChild(link);
    link.click();
  }

  static filterCardById(id: string, cards: Card[]) {
    for (let index = 0; index < cards.length; index++) {
      const element = cards[index]
      if (element.id === id) {
        return element;
      };

    }
    return {};
  }

  static getTextDecorateStrong(text: any, chartOpen:string, chartClose:string) {
    return text.replaceAll(chartOpen, '<strong>').replaceAll(chartClose,'</strong>');
  }
}
