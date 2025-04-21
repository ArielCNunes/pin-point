import { Component } from '@angular/core';
import { BookmarkService, Bookmark } from 'src/app/services/bookmark.service';
import { Geolocation } from '@capacitor/geolocation';
import { format } from 'date-fns';
import { NavController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
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

// Component for adding a new bookmark with geolocation and address lookup
@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.page.html',
  styleUrls: ['./add-bookmark.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
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
  // Form model for bookmark input fields
  bookmark: Partial<Bookmark> = {
    name: '',
    description: '',
    tags: [],
  };
  // String to hold comma-separated tags entered by the user
  tagsString = '';

  // Inject services for managing bookmarks and navigation
  constructor(
    private bookmarkService: BookmarkService,
    private navCtrl: NavController
  ) { }

  // Converts latitude and longitude to a human-readable address using Google Maps API
  async getAddressFromCoordinates(lat: number, lon: number) {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${environment.googleMapsApiKey}`;
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    
    // Extract formatted address from the geocoding API response
    const address = data.results[0]?.formatted_address;
    console.log(address);
    return address;
  }

  // Saves a new bookmark with current geolocation and user-entered data
  async saveBookmark() {
    // Get user's current geolocation with high accuracy
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true, // High accuracy mode
    });

    // Get the address from coordinates
    const address = await this.getAddressFromCoordinates(coordinates.coords.latitude, coordinates.coords.longitude);

    // Construct new bookmark object with location, tags, and timestamp
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
    // Navigate back after saving the bookmark
    this.navCtrl.back();
  }
}