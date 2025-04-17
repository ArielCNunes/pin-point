import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    pathMatch: 'full',
  },
  {
    path: 'add-bookmark',
    loadComponent: () => import('./pages/add-bookmark/add-bookmark.page').then(m => m.AddBookmarkPage)
  },
  {
    path: 'edit-bookmark/:id',
    loadComponent: () => import('./pages/edit-bookmark/edit-bookmark.page').then(m => m.EditBookmarkPage)
  },
  {
    path: 'bookmark/:id',
    loadComponent: () => import('./pages/bookmark-detail/bookmark-detail.page').then(m => m.BookmarkDetailPage)
  }
];
