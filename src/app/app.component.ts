import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Item { name: string; }

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  // template: `
  //   <ul>
  //     <li *ngFor="let item of items | async">
  //       {{ item.name }}
  //     </li>
  //     <button (click)="addItem()"> add item</button>
  //   </ul>
  // `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'adm_details';

  filterName = 'zanti'
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {
    this.getItem()
  }
  addItem() {
    let item = { name: "zanti" };
    this.itemsCollection.add(item);
  }

  updateItem(docId: string) {
    let item = { name: "santhosh" , age:50};
    // this.itemsCollection.add(item);
    this.afs.doc('items/'+docId).update({
      age:27
    });
  }
  getItem() {
    this.afs.
      collection<any>('items', ref =>
        ref)
      .valueChanges({ idField: 'id' }).subscribe((data) => {
        console.log(data);
      }
      );
  }

}
