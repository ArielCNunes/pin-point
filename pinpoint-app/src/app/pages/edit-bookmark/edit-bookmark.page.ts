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

  // Holds the comma-separated string of tags to be entered in the form
  tagsString = '';

  // Navigation controller used to navigate back after saving the bookmark
  private navCtrl: NavController;

  // Inject route for accessing ID param and bookmark service for fetching data
  constructor(
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService,
    navCtrl: NavController // Initialize navigation controller
  ) {
    this.navCtrl = navCtrl;
  }

  // Fetch the bookmark by its ID from Firestore when the component initializes
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Get bookmark ID from the route
    if (id) {
      this.bookmarkService.getBookmarks().subscribe(bookmarks => {
        // Find the bookmark with matching ID
        const foundBookmark = bookmarks.find(b => b.id === id);

        // Only proceed if the bookmark exists
        if (foundBookmark) {
          this.bookmark = foundBookmark; // Assign the found bookmark to the component
          this.tagsString = this.bookmark.tags?.join(', ') || ''; // Safely join tags if they exist
        }
      });
    }
  }

  // Save the updated bookmark data to Firestore
  saveBookmark() {
    if (this.bookmark.id) {
      const updated = {
        ...this.bookmark, // Spread the existing bookmark properties
        tags: this.tagsString.split(',').map(t => t.trim()) // Split tags by commas and trim whitespace
      };

      // Update the bookmark in Firestore and navigate back
      this.bookmarkService.updateBookmark(this.bookmark.id, updated).then(() => {
        this.navCtrl.back(); // Navigate back to the previous page
      });
    }
  }
}
