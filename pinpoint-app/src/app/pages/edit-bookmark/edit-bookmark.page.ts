import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonTextarea, IonButton, NavController } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { BookmarkService, Bookmark } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.page.html',
  styleUrls: ['./edit-bookmark.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonTextarea, IonButton, CommonModule, FormsModule]
})
export class EditBookmarkPage implements OnInit {
  // Holds the bookmark data to be edited, loaded from Firestore
  bookmark: Partial<Bookmark> = {};
  tagsString = '';
  private navCtrl: NavController;

  // Inject route for accessing ID param and bookmark service for fetching data
  constructor(
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService,
    navCtrl: NavController
  ) {
    this.navCtrl = navCtrl;
  }

  ngOnInit() {
    // Extract the bookmark ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Subscribe to the bookmarks observable and find the one with matching ID
      this.bookmarkService.getBookmarks().subscribe(bookmarks => {
        const found = bookmarks.find(b => b.id === id);
        if (found) {
          // Clone the found bookmark into the editable local model
          this.bookmark = { ...found };
        }
      });
    }
  }

  saveBookmark() {
    if (this.bookmark.id) {
      const updated = {
        ...this.bookmark,
        tags: this.tagsString.split(',').map(t => t.trim())
      };
      this.bookmarkService.updateBookmark(this.bookmark.id, updated).then(() => {
        this.navCtrl.back();
      });
    }
  }
}
