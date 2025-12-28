import { Injectable } from '@angular/core';
import { Event, Venue } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly EVENTS_KEY = 'timetable_events';
  private readonly VENUES_KEY = 'timetable_venues';

  constructor() {
    this.initializeDefaultData();
  }

  private getCurrentWeekMonday(): string {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    return this.formatDate(monday);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private getDateOffset(baseDate: string, offsetDays: number): string {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + offsetDays);
    return this.formatDate(date);
  }

  private initializeDefaultData(): void {
    if (!this.getVenues().length) {
      const defaultVenues: Venue[] = [
        { id: 'venue1', name: 'Venue1' },
        { id: 'venue2', name: 'Venue2' },
        { id: 'venue3', name: 'Venue3' },
        { id: 'venue4', name: 'Venue4' },
        { id: 'venue5', name: 'Venue5' },
        { id: 'venue6', name: 'Venue6' },
        { id: 'venue7', name: 'Venue7' },
        { id: 'venue8', name: 'Venue8' }
      ];
      this.saveVenues(defaultVenues);
    }

    if (!this.getEvents().length) {
      const monday = this.getCurrentWeekMonday();
      const tuesday = this.getDateOffset(monday, 1);
      const wednesday = this.getDateOffset(monday, 2);
      const thursday = this.getDateOffset(monday, 3);
      const friday = this.getDateOffset(monday, 4);
      
      const defaultEvents: Event[] = [
        {
          id: '1',
          title: 'Morning Standup',
          venueId: 'venue1',
          startTime: '09:00',
          endTime: '09:30',
          date: monday,
          color: '#90EE90'
        },
        {
          id: '2',
          title: 'Team Meeting',
          venueId: 'venue2',
          startTime: '10:00',
          endTime: '11:00',
          date: monday,
          color: '#FFB347'
        },
        {
          id: '3',
          title: 'Workshop',
          venueId: 'venue3',
          startTime: '09:45',
          endTime: '11:00',
          date: monday,
          color: '#87CEEB'
        },
        {
          id: '4',
          title: 'Training',
          venueId: 'venue4',
          startTime: '11:00',
          endTime: '12:30',
          date: monday,
          color: '#FFB6C1'
        },
        {
          id: '5',
          title: 'Presentation',
          venueId: 'venue5',
          startTime: '13:00',
          endTime: '14:30',
          date: monday,
          color: '#DDA0DD'
        },
        {
          id: '6',
          title: 'Review Session',
          venueId: 'venue6',
          startTime: '14:00',
          endTime: '15:00',
          date: monday,
          color: '#F0E68C'
        },
        {
          id: '7',
          title: 'Sprint Planning',
          venueId: 'venue7',
          startTime: '10:30',
          endTime: '12:00',
          date: monday,
          color: '#98FB98'
        },
        {
          id: '8',
          title: 'Client Call',
          venueId: 'venue8',
          startTime: '15:00',
          endTime: '16:00',
          date: monday,
          color: '#AFEEEE'
        },
        {
          id: '9',
          title: 'Design Review',
          venueId: 'venue1',
          startTime: '10:00',
          endTime: '11:30',
          date: tuesday,
          color: '#FFD700'
        },
        {
          id: '10',
          title: 'Code Review',
          venueId: 'venue3',
          startTime: '14:00',
          endTime: '15:30',
          date: tuesday,
          color: '#FF6B6B'
        },
        {
          id: '11',
          title: 'All Hands',
          venueId: 'venue2',
          startTime: '11:00',
          endTime: '12:00',
          date: wednesday,
          color: '#4ECDC4'
        },
        {
          id: '12',
          title: 'Tech Talk',
          venueId: 'venue5',
          startTime: '15:00',
          endTime: '16:30',
          date: wednesday,
          color: '#A78BFA'
        },
        {
          id: '13',
          title: 'Product Demo',
          venueId: 'venue4',
          startTime: '09:30',
          endTime: '10:30',
          date: thursday,
          color: '#F472B6'
        },
        {
          id: '14',
          title: 'Retrospective',
          venueId: 'venue6',
          startTime: '16:00',
          endTime: '17:00',
          date: thursday,
          color: '#34D399'
        },
        {
          id: '15',
          title: 'Team Building',
          venueId: 'venue1',
          startTime: '14:00',
          endTime: '16:00',
          date: friday,
          color: '#FB923C'
        },
        {
          id: '16',
          title: 'Weekly Wrap-up',
          venueId: 'venue7',
          startTime: '17:00',
          endTime: '17:45',
          date: friday,
          color: '#60A5FA'
        }
      ];
      this.saveEvents(defaultEvents);
    }
  }

  // Events methods
  getEvents(): Event[] {
    const data = localStorage.getItem(this.EVENTS_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveEvents(events: Event[]): void {
    localStorage.setItem(this.EVENTS_KEY, JSON.stringify(events));
  }

  addEvent(event: Event): void {
    const events = this.getEvents();
    events.push(event);
    this.saveEvents(events);
  }

  updateEvent(eventId: string, updatedEvent: Event): void {
    const events = this.getEvents();
    const index = events.findIndex(e => e.id === eventId);
    if (index !== -1) {
      events[index] = updatedEvent;
      this.saveEvents(events);
    }
  }

  deleteEvent(eventId: string): void {
    const events = this.getEvents();
    const filteredEvents = events.filter(e => e.id !== eventId);
    this.saveEvents(filteredEvents);
  }

  getEventsByDate(date: string): Event[] {
    return this.getEvents().filter(event => event.date === date);
  }

  // Venues methods
  getVenues(): Venue[] {
    const data = localStorage.getItem(this.VENUES_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveVenues(venues: Venue[]): void {
    localStorage.setItem(this.VENUES_KEY, JSON.stringify(venues));
  }

  addVenue(venue: Venue): void {
    const venues = this.getVenues();
    venues.push(venue);
    this.saveVenues(venues);
  }

  deleteVenue(venueId: string): void {
    const venues = this.getVenues();
    const filteredVenues = venues.filter(v => v.id !== venueId);
    this.saveVenues(filteredVenues);
  }
}
