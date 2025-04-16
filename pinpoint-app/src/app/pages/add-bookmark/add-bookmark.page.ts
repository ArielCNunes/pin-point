import { Component } from '@angular/core';
import { BookmarkService, Bookmark } from 'src/app/services/bookmark.service';
import { Geolocation } from '@capacitor/geolocation';
import { format } from 'date-fns';
import { NavController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.page.html',
  styleUrls: ['./add-bookmark.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    FormsModule
  ]
})
export class AddBookmarkPage {
  bookmark: Partial<Bookmark> = {
    name: '',
    description: '',
    tags: [],
  };
  tagsString = '';

  constructor(
    private bookmarkService: BookmarkService,
    private navCtrl: NavController
  ) { }

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