import { Component } from '@angular/core';
import {
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
  IonChip
} from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';
import { BookmarkService, Bookmark } from 'src/app/services/bookmark.service';
import { CommonModule } from '@angular/common';
import { SharedHeaderComponent } from '../shared-header/shared-header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
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
    CommonModule,
    IonChip,
    SharedHeaderComponent
  ],
})
export class HomePage {
  bookmarks$ = this.bookmarkService.getBookmarks();

  constructor(private bookmarkService: BookmarkService, private router: Router) { }

  deleteBookmark(id: string) {
    this.bookmarkService.deleteBookmark(id);
  }

  goToBookmark(id: string) {
    this.router.navigate(['/bookmark', id]);
  }
}
