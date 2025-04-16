import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonChip, IonLabel } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { BookmarkService, Bookmark } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-bookmark-detail',
  templateUrl: './bookmark-detail.page.html',
  styleUrls: ['./bookmark-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonChip, IonLabel, CommonModule, FormsModule]
})
export class BookmarkDetailPage implements OnInit {
  bookmark: Bookmark | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookmarkService.getBookmarks().subscribe(bookmarks => {
        this.bookmark = bookmarks.find(b => b.id === id);
      });
    }
  }
}
