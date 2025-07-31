import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Note } from '../../models/note.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.css'
})
export class NoteEditorComponent implements OnChanges {
  /** Editor and viewer for a note */
  @Input() note: Note | null = null;
  @Input() isNew = false;
  @Output() save = new EventEmitter<{title: string; content: string;}>();
  @Output() cancel = new EventEmitter<void>();

  noteForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['note']) {
      if (this.note) {
        this.noteForm.setValue({
          title: this.note.title,
          content: this.note.content,
        });
      } else {
        this.noteForm.reset();
      }
    }
    if (changes['isNew'] && this.isNew) {
      this.noteForm.reset();
    }
  }

  onSave() {
    const value = this.noteForm.value;
    this.save.emit({ title: value.title || '', content: value.content || ''});
    this.noteForm.reset();
  }

  onCancel() {
    this.cancel.emit();
    this.noteForm.reset();
  }
}
