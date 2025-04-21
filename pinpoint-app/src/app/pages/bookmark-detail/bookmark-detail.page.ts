import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BookmarkService, Bookmark } from 'src/app/services/bookmark.service';
import { Router } from '@angular/router';
import { SharedHeaderComponent } from 'src/app/shared-header/shared-header.component';
import { environment } from 'src/environments/environment';

// Component for displaying details of a selected bookmark including a map
@Component({
  selector: 'app-bookmark-detail',
  templateUrl: './bookmark-detail.page.html',
  styleUrls: ['./bookmark-detail.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, SharedHeaderComponent] // Use IonicModule instead of individual Ion* components
})
export class BookmarkDetailPage implements OnInit, AfterViewInit {
  // Holds the bookmark data loaded from Firestore
  bookmark: Bookmark | undefined;
  // Comma-separated string of tags for display
  tagsString: string = ''; // Initialize tagsString
  // Ensures the map is only loaded once
  mapLoaded = false;

  // Inject necessary services: ActivatedRoute for route parameters, BookmarkService for fetching data, and Router for navigation
  constructor(
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService,
    private router: Router
  ) { }

  // Lifecycle hook: retrieves bookmark ID and loads the corresponding data
  ngOnInit() {
    // Get the bookmark ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Fetch bookmarks and find the one that matches the ID
      this.bookmarkService.getBookmarks().subscribe(bookmarks => {
        // Find and assign the bookmark matching the ID
        this.bookmark = bookmarks.find(b => b.id === id); // Set the bookmark object
        if (this.bookmark) {
          this.tagsString = this.bookmark.tags.join(', ') || ''; // Pre-fill the tags
        }
      });
    }
  }

  // Lifecycle hook: initializes the map once the view is ready
  ngAfterViewInit() {
    // Wait for bookmark to load, then initialize map
    if (this.bookmark) {
      // Immediately load map if bookmark is already available
      this.loadMap();
    } else {
      // If bookmark loads asynchronously
      this.bookmarkService.getBookmarks().subscribe(bookmarks => {
        const id = this.route.snapshot.paramMap.get('id');
        // Load bookmark asynchronously and initialize map
        this.bookmark = bookmarks.find(b => b.id === id);
        if (this.bookmark && !this.mapLoaded) {
          this.loadMap();
        }
      });
    }
  }

  // Loads Google Maps JavaScript API and initializes map
  loadMap() {
    if (!this.bookmark || this.mapLoaded) return;
    const lat = this.bookmark.latitude;
    const lng = this.bookmark.longitude;
    // Dynamically inject Google Maps script if not already loaded
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

  // Initializes the Google Map centered on the bookmark's coordinates
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

  // Opens the location in an external Google Maps tab
  openInMaps() {
    if (!this.bookmark) return;
    const lat = this.bookmark.latitude;
    const lng = this.bookmark.longitude;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  }

  // Navigates to the edit page for the current bookmark
  goToEditBookmark() {
    // If a bookmark is found, navigate to its edit page
    if (this.bookmark?.id) {
      this.router.navigate(['/edit-bookmark', this.bookmark.id]);
    }
  }
}
