import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Bookmark {
    id?: string;
    name: string;
    description: string;
    tags: string[];
    latitude: number;
    longitude: number;
    photoUrl?: string;
    createdAt?: string;
    address?: string;  // Add address field here
}

@Injectable({ providedIn: 'root' })
export class BookmarkService {
    private bookmarksRef = collection(this.firestore, 'bookmarks');

    constructor(private firestore: Firestore) { }

    // Fetches all bookmarks from Firestore and returns them as an Observable.
    getBookmarks(): Observable<Bookmark[]> {
        return collectionData(this.bookmarksRef, { idField: 'id' }) as Observable<Bookmark[]>;
    }

    // Adds a new bookmark document to the Firestore collection.
    addBookmark(bookmark: Bookmark) {
        return addDoc(this.bookmarksRef, bookmark);
    }

    // Updates an existing bookmark document in Firestore based on its ID.
    updateBookmark(id: string, data: Partial<Bookmark>) {
        const docRef = doc(this.firestore, `bookmarks/${id}`);
        return updateDoc(docRef, data);
    }

    // Deletes a bookmark document from Firestore by ID.
    deleteBookmark(id: string) {
        const docRef = doc(this.firestore, `bookmarks/${id}`);
        return deleteDoc(docRef);
    }
}