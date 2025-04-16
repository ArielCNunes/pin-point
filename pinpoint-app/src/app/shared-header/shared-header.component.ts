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
  @Input() showBackButton: boolean = false;

  constructor(private navCtrl: NavController) { }

  ngOnInit() { }

  goBack() {
    this.navCtrl.back();
  }
}
