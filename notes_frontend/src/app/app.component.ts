import { Component } from '@angular/core';
import { Note } from './models/note.model';
import { NoteService } from './services/note.service';
import { HeaderComponent } from './components/header/header.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NoteListComponent,
    NoteEditorComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [NoteService],
})
export class AppComponent {
  notes$: Observable<Note[]>;
  selectedNoteId: number | null = null;
  isCreating: boolean = false;
  selectedNote: Note | null = null;
  private noteService: NoteService;

  constructor(noteService: NoteService) {
    this.noteService = noteService;
    this.notes$ = this.noteService.getNotes();
    this.notes$.subscribe(notes => {
      if (!notes.length || this.selectedNoteId === null) {
        this.selectedNote = null;
        return;
      }
      this.selectedNote = notes.find((n: Note) => n.id === this.selectedNoteId) || null;
    });
  }

  onSelectNote(id: number) {
    this.selectedNoteId = id;
    this.isCreating = false;
    // selectedNote will update via notes$ subscription
  }

  onCreateNote() {
    this.selectedNoteId = null;
    this.isCreating = true;
  }

  onDeleteNote(id: number) {
    this.noteService.deleteNote(id);
    if (this.selectedNoteId === id) {
      this.selectedNoteId = null;
      this.selectedNote = null;
    }
  }

  onSaveNote(data: {title: string; content: string}) {
    if (this.isCreating) {
      this.noteService.createNote(data);
      this.isCreating = false;
    } else if (this.selectedNoteId !== null) {
      this.noteService.updateNote(this.selectedNoteId, data);
    }
  }

  onCancelEdit() {
    this.isCreating = false;
  }
}
