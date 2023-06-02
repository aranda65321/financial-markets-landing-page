import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../domain/models/Card';
import {
  CollectionReference,
  collection,
  addDoc,
  doc,
} from 'firebase/firestore';
import {
  Firestore,
  docData,
  collectionData,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '../domain/models/User';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private userCollections: CollectionReference<User>;
  private cardsCollection: CollectionReference<Card>;
  constructor(private http: HttpClient, private readonly fireStore: Firestore) {
    this.cardsCollection = collection(this.fireStore, 'cards');
    this.userCollections = collection(this.fireStore, 'users');
  }

  createUser(user: User) {
    return addDoc(this.userCollections, user);
  }

  getAllUser() {
    return collectionData(this.userCollections, {
      idField: 'id',
    }) as Observable<User[]>;
  }

  createCard(card: Card) {
    return addDoc(this.cardsCollection, card);
  }

  getCardByid(idCard: string): Observable<any> {
    return docData(doc(this.fireStore, `cards/${idCard}`), { idField: 'id' });
  }

  getAllCards() {
    return collectionData(this.cardsCollection, {
      idField: 'id',
    }) as Observable<Card[]>;
  }

  updateCard(card: Card) {
    return updateDoc(doc(this.fireStore, `cards/${card.id}`), { ...card });
  }
}
