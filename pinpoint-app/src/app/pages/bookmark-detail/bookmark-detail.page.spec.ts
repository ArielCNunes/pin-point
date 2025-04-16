import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkDetailPage } from './bookmark-detail.page';

describe('BookmarkDetailPage', () => {
  let component: BookmarkDetailPage;
  let fixture: ComponentFixture<BookmarkDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
