import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { BookmarkService, Bookmark } from 'src/app/services/bookmark.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    RouterModule,
    CommonModule
  ],
})
export class HomePage {
  bookmarks$ = this.bookmarkService.getBookmarks();

  constructor(private bookmarkService: BookmarkService) { }

  deleteBookmark(id: string) {
    this.bookmarkService.deleteBookmark(id);
  }
}
