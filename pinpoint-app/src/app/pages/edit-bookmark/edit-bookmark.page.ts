import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.page.html',
  styleUrls: ['./edit-bookmark.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditBookmarkPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
