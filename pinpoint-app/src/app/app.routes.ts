import { Routes } from '@angular/router';

// Application routes configuration for lazy-loaded standalone components
export const routes: Routes = [
  // Home route, loads HomePage component
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    pathMatch: 'full',
  },
  // Route for adding a new bookmark
  {
    path: 'add-bookmark',
    loadComponent: () => import('./pages/add-bookmark/add-bookmark.page').then(m => m.AddBookmarkPage)
  },
  // Route for editing an existing bookmark by its ID
  {
    path: 'edit-bookmark/:id',
    loadComponent: () => import('./pages/edit-bookmark/edit-bookmark.page').then(m => m.EditBookmarkPage)
  },
  // Route for viewing the details of a specific bookmark by its ID
  {
    path: 'bookmark/:id',
    loadComponent: () => import('./pages/bookmark-detail/bookmark-detail.page').then(m => m.BookmarkDetailPage)
  }
];
