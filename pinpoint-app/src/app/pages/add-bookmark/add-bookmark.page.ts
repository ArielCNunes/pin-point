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
import { SharedHeaderComponent } from 'src/app/shared-header/shared-header.component';
import { environment } from 'src/environments/environment';

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
    FormsModule,
    SharedHeaderComponent
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

  async getAddressFromCoordinates(lat: number, lon: number) {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${environment.googleMapsApiKey}`;
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    const address = data.results[0]?.formatted_address;
    console.log(address);
    return address;
  }

  async saveBookmark() {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true, // High accuracy mode
    });

    // Get the address from coordinates
    const address = await this.getAddressFromCoordinates(coordinates.coords.latitude, coordinates.coords.longitude);

    const newBookmark: Bookmark = {
      name: this.bookmark.name!,
      description: this.bookmark.description || '',
      tags: this.tagsString.split(',').map(tag => tag.trim()),
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
      address: address,
      createdAt: format(new Date(), 'PPpp')
    };

    await this.bookmarkService.addBookmark(newBookmark);
    this.navCtrl.back();
  }
}