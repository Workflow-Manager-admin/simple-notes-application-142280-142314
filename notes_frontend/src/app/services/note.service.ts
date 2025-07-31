import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../models/note.model';

// PUBLIC_INTERFACE
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  /** This service manages CRUD operations for notes. In a real application, this service
   * would interact with a backend API. Here, notes are managed in-memory.
   */
  private notesSubject = new BehaviorSubject<Note[]>([]);
  private noteIdCounter = 1;

  constructor() {
    // Optionally seed with a sample note
    this.createNote({title: 'Welcome', content: 'Start taking notes!'});
  }

  // PUBLIC_INTERFACE
  getNotes(): Observable<Note[]> {
    /** Returns an observable stream of the notes list */
    return this.notesSubject.asObservable();
  }

  // PUBLIC_INTERFACE
  getNoteById(id: number): Note | undefined {
    /** Returns a note by ID or undefined */
    return this.notesSubject.getValue().find(note => note.id === id);
  }

  // PUBLIC_INTERFACE
  createNote(data: {title: string; content: string}): void {
    /** Creates a new note and emits the updated notes list */
    const now = new Date();
    const note: Note = {
      id: this.noteIdCounter++,
      title: data.title.trim() || 'Untitled',
      content: data.content,
      createdAt: now,
      updatedAt: now,
    };
    this.notesSubject.next([note, ...this.notesSubject.getValue()]);
  }

  // PUBLIC_INTERFACE
  updateNote(id: number, data: {title: string; content: string}): void {
    /** Updates an existing note and emits the updated notes list */
    const notes = this.notesSubject.getValue().map(note =>
      note.id === id
        ? {
            ...note,
            title: data.title.trim() || 'Untitled',
            content: data.content,
            updatedAt: new Date(),
          }
        : note,
    );
    this.notesSubject.next(notes);
  }

  // PUBLIC_INTERFACE
  deleteNote(id: number): void {
    /** Deletes a note by ID and emits the updated notes list */
    const notes = this.notesSubject.getValue().filter(note => note.id !== id);
    this.notesSubject.next(notes);
  }
}
