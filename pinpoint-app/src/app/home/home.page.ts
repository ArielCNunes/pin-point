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
// HomePage component responsible for displaying and managing bookmarks

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
  // Observable stream of bookmarks retrieved from the service
  bookmarks$ = this.bookmarkService.getBookmarks();

  // Inject BookmarkService for data operations and Router for navigation
  constructor(private bookmarkService: BookmarkService, private router: Router) { }

  // Deletes a bookmark using the service by its ID
  deleteBookmark(id: string) {
    this.bookmarkService.deleteBookmark(id);
  }

  // Navigates to the detail page of a selected bookmark
  goToBookmark(id: string) {
    this.router.navigate(['/bookmark', id]);
  }
}
