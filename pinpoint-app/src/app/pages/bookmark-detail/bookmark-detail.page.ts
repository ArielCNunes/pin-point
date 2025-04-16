import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BookmarkService, Bookmark } from 'src/app/services/bookmark.service';
import { Router } from '@angular/router';

// Component decorator with metadata for the page
@Component({
  selector: 'app-bookmark-detail',
  templateUrl: './bookmark-detail.page.html',
  styleUrls: ['./bookmark-detail.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule] // Use IonicModule instead of individual Ion* components
})
export class BookmarkDetailPage implements OnInit {
  // Holds the bookmark data loaded from Firestore
  bookmark: Bookmark | undefined;

  // Inject necessary services: ActivatedRoute for route parameters, BookmarkService for fetching data, and Router for navigation
  constructor(
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService,
    private router: Router
  ) { }

  // ngOnInit lifecycle hook to fetch the bookmark by ID
  ngOnInit() {
    // Get the bookmark ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Fetch bookmarks and find the one that matches the ID
      this.bookmarkService.getBookmarks().subscribe(bookmarks => {
        this.bookmark = bookmarks.find(b => b.id === id); // Set the bookmark object
      });
    }
  }

  // Method to navigate to the edit page for this bookmark
  goToEditBookmark() {
    // If a bookmark is found, navigate to its edit page
    if (this.bookmark?.id) {
      this.router.navigate(['/edit-bookmark', this.bookmark.id]);
    }
  }
}
