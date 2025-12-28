import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Event, Venue } from '../../models/event.model';

export interface EventDialogData {
  venues: Venue[];
  selectedDate?: string;
}

@Component({
  selector: 'app-event-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent {
  event: Partial<Event> = {
    title: '',
    venueId: '',
    startTime: '09:00',
    endTime: '10:00',
    date: '',
    color: '#90EE90'
  };

  timeOptions: string[] = [];
  colors = [
    { name: 'Light Green', value: '#90EE90' },
    { name: 'Orange', value: '#FFB347' },
    { name: 'Light Blue', value: '#87CEEB' },
    { name: 'Pink', value: '#FFB6C1' },
    { name: 'Plum', value: '#DDA0DD' },
    { name: 'Khaki', value: '#F0E68C' },
    { name: 'Pale Green', value: '#98FB98' },
    { name: 'Turquoise', value: '#AFEEEE' },
    { name: 'Gold', value: '#FFD700' },
    { name: 'Coral', value: '#FF6B6B' },
    { name: 'Teal', value: '#4ECDC4' },
    { name: 'Purple', value: '#A78BFA' }
  ];

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventDialogData
  ) {
    this.generateTimeOptions();
    if (data.selectedDate) {
      this.event.date = data.selectedDate;
    }
  }

  generateTimeOptions(): void {
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        this.timeOptions.push(timeString);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.isValid()) {
      this.dialogRef.close(this.event);
    }
  }

  isValid(): boolean {
    return !!(
      this.event.title &&
      this.event.venueId &&
      this.event.startTime &&
      this.event.endTime &&
      this.event.date &&
      this.event.startTime < this.event.endTime
    );
  }
}
