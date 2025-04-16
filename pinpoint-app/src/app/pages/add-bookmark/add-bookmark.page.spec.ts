import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBookmarkPage } from './add-bookmark.page';

describe('AddBookmarkPage', () => {
  let component: AddBookmarkPage;
  let fixture: ComponentFixture<AddBookmarkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookmarkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
