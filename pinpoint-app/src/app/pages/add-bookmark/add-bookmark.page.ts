import { Component } from '@angular/core';
import { BookmarkService, Bookmark } from 'src/app/services/bookmark.service';
import { Geolocation } from '@capacitor/geolocation';
import { format } from 'date-fns';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.page.html',
  styleUrls: ['./add-bookmark.page.scss'],
  standalone: true,
})
export class AddBookmarkPage {
  bookmark: Partial<Bookmark> = {
    name: '',
    description: '',
    tags: [],
  };
  tagsString = '';

  // Injects the bookmark service for saving data and nav controller for navigation.
  constructor(
    private bookmarkService: BookmarkService,
    private navCtrl: NavController
  ) { }

  // Captures user location, constructs a new bookmark object, and saves it to Firestore.
  async saveBookmark() {
    const coordinates = await Geolocation.getCurrentPosition();

    const newBookmark: Bookmark = {
      name: this.bookmark.name!,
      description: this.bookmark.description || '',
      tags: this.tagsString.split(',').map(tag => tag.trim()),
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
      createdAt: format(new Date(), 'PPpp')
    };

    await this.bookmarkService.addBookmark(newBookmark);
    this.navCtrl.back();
  }
}