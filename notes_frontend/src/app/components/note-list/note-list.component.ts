import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../models/note.model';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent {
  /** Displays the list of notes and lets user select or delete a note. */
  @Input() notes: Note[] = [];
  @Input() selectedNoteId: number | null = null;
  @Output() selectNote = new EventEmitter<number>();
  @Output() deleteNote = new EventEmitter<number>();
  @Output() createNote = new EventEmitter<void>();

  onNoteClick(id: number) {
    this.selectNote.emit(id);
  }
  onDeleteClick(e: MouseEvent, id: number) {
    e.stopPropagation();
    this.deleteNote.emit(id);
  }
  onCreateClick() {
    this.createNote.emit();
  }
}
