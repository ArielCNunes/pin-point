import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle
} from '@ionic/angular/standalone';

// Shared header component used across pages to display a toolbar
@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle
  ],
})
export class SharedHeaderComponent implements OnInit {
  // Input property to toggle the visibility of the back button
  @Input() showBackButton: boolean = false;

  // Inject NavController to handle back navigation
  constructor(private navCtrl: NavController) { }

  ngOnInit() { }

  // Navigate back to the previous page
  goBack() {
    this.navCtrl.back();
  }
}
