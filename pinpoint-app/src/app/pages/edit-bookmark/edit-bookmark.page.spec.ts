import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBookmarkPage } from './edit-bookmark.page';

describe('EditBookmarkPage', () => {
  let component: EditBookmarkPage;
  let fixture: ComponentFixture<EditBookmarkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookmarkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
