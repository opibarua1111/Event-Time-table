import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Event, Venue, DayTab } from '../../models/event.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { TimetableService } from '../../services/timetable.service';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatDialogModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  @ViewChild('timeSlotContainer') timeSlotContainer!: ElementRef;
  @ViewChild('scrollableContent') scrollableContent!: ElementRef;
  
  weekDays: DayTab[] = [];
  timeSlots: string[] = [];
  venues: Venue[] = [];
  events: Event[] = [];
  selectedDate: string = '';
  selectedEvents: Set<string> = new Set<string>();
  
  readonly VENUE_WIDTH = 200;
  readonly TIME_SLOT_HEIGHT = 30;
  readonly PIXELS_PER_MINUTE = 2;
  readonly START_HOUR = 9;
  readonly END_HOUR = 18;

  constructor(
    private localStorageService: LocalStorageService,
    private timetableService: TimetableService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.weekDays = this.timetableService.generateWeekDays();
    this.timeSlots = this.timetableService.generateTimeSlots(this.START_HOUR, this.END_HOUR, 15);
    this.venues = this.localStorageService.getVenues();
    
    const today = new Date();
    const todayString = this.formatDate(today);
    const matchingDay = this.weekDays.find(day => day.date === todayString);
    this.selectedDate = matchingDay ? matchingDay.date : this.weekDays[0].date;
    
    this.loadEvents();
  }

  onTabChange(index: number): void {
    this.selectedDate = this.weekDays[index].date;
    this.loadEvents();
  }

  private loadEvents(): void {
    this.events = this.localStorageService.getEventsByDate(this.selectedDate);
  }

  getEventsForVenue(venueId: string): Event[] {
    return this.events.filter(event => event.venueId === venueId);
  }

  getEventStyle(event: Event): any {
    const height = this.timetableService.calculateEventHeight(
      event.startTime, 
      event.endTime, 
      this.PIXELS_PER_MINUTE
    );
    const top = this.timetableService.calculateEventTop(
      event.startTime, 
      this.START_HOUR, 
      this.PIXELS_PER_MINUTE
    );

    return {
      height: `${height}px`,
      top: `${top}px`,
      width: `${this.VENUE_WIDTH}px`,
      backgroundColor: event.color || '#90EE90',
      position: 'absolute',
      left: '0'
    };
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getGridHeight(): string {
    return `${this.timeSlots.length * this.TIME_SLOT_HEIGHT}px`;
  }

  getSelectedTabIndex(): number {
    return this.weekDays.findIndex(day => day.date === this.selectedDate);
  }

  onScroll(scrollEvent: any): void {
    const target = scrollEvent.target as HTMLElement;
    if (this.timeSlotContainer && this.timeSlotContainer.nativeElement) {
      this.timeSlotContainer.nativeElement.scrollTop = target.scrollTop;
    }
  }

  toggleEventSelection(event: Event): void {
    if (this.selectedEvents.has(event.id)) {
      this.selectedEvents.delete(event.id);
    } else {
      this.selectedEvents.add(event.id);
    }
  }

  isEventSelected(event: Event): boolean {
    return this.selectedEvents.has(event.id);
  }

  clearSelection(): void {
    this.selectedEvents.clear();
  }

  getSelectedEventsCount(): number {
    return this.selectedEvents.size;
  }

  getSelectedEventsList(): Event[] {
    return this.events.filter(event => this.selectedEvents.has(event.id));
  }

  openCreateEventDialog(): void {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '600px',
      panelClass: 'event-dialog-panel',
      data: {
        venues: this.venues,
        selectedDate: this.selectedDate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newEvent: Event = {
          id: Date.now().toString(),
          title: result.title!,
          venueId: result.venueId!,
          startTime: result.startTime!,
          endTime: result.endTime!,
          date: result.date!,
          color: result.color || '#90EE90'
        };
        this.localStorageService.addEvent(newEvent);
        this.loadEvents();
      }
    });
  }

  deleteSelectedEvents(): void {
    if (this.selectedEvents.size === 0) return;

    const eventIds = Array.from(this.selectedEvents);
    eventIds.forEach(id => {
      this.localStorageService.deleteEvent(id);
    });
    
    this.selectedEvents.clear();
    this.loadEvents();
  }
}
