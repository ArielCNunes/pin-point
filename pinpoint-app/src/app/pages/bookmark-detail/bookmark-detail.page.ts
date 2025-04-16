import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BookmarkService, Bookmark } from 'src/app/services/bookmark.service';
import { Router } from '@angular/router';
import { SharedHeaderComponent } from 'src/app/shared-header/shared-header.component';
import { environment } from 'src/environments/environment';

// Component decorator with metadata for the page
@Component({
  selector: 'app-bookmark-detail',
  templateUrl: './bookmark-detail.page.html',
  styleUrls: ['./bookmark-detail.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, SharedHeaderComponent] // Use IonicModule instead of individual Ion* components
})
export class BookmarkDetailPage implements OnInit, AfterViewInit {
  // Holds the bookmark data loaded from Firestore
  bookmark: Bookmark | undefined;
  tagsString: string = ''; // Initialize tagsString
  mapLoaded = false;

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
        if (this.bookmark) {
          this.tagsString = this.bookmark.tags.join(', ') || ''; // Pre-fill the tags
        }
      });
    }
  }

  ngAfterViewInit() {
    // Wait for bookmark to load, then initialize map
    if (this.bookmark) {
      this.loadMap();
    } else {
      // If bookmark loads asynchronously
      this.bookmarkService.getBookmarks().subscribe(bookmarks => {
        const id = this.route.snapshot.paramMap.get('id');
        this.bookmark = bookmarks.find(b => b.id === id);
        if (this.bookmark && !this.mapLoaded) {
          this.loadMap();
        }
      });
    }
  }

  loadMap() {
    if (!this.bookmark || this.mapLoaded) return;
    const lat = this.bookmark.latitude;
    const lng = this.bookmark.longitude;
    // Load Google Maps JS API if not already loaded
    if (!(window as any).google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => this.initMap(lat, lng);
      document.body.appendChild(script);
    } else {
      this.initMap(lat, lng);
    }
  }

  // Initialize the Google Map centered on the bookmark's location
  initMap(lat: number, lng: number) {
    const map = new (window as any).google.maps.Map(document.getElementById('map'), {
      center: { lat, lng },
      zoom: 16,
      disableDefaultUI: true,
      gestureHandling: 'none',
    });
    new (window as any).google.maps.Marker({
      position: { lat, lng },
      map,
      title: this.bookmark?.name || 'Location',
    });
    this.mapLoaded = true;
  }

  // Open the bookmark's location in Google Maps in a new browser tab
  openInMaps() {
    if (!this.bookmark) return;
    const lat = this.bookmark.latitude;
    const lng = this.bookmark.longitude;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  }

  // Method to navigate to the edit page for this bookmark
  goToEditBookmark() {
    // If a bookmark is found, navigate to its edit page
    if (this.bookmark?.id) {
      this.router.navigate(['/edit-bookmark', this.bookmark.id]);
    }
  }
}
