import { Injectable } from '@angular/core';
import { DayTab } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  
  generateWeekDays(startDate?: Date): DayTab[] {
    const days: DayTab[] = [];
    const start = startDate || new Date();
    
    const dayOfWeek = start.getDay();
    const diff = start.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(start.setDate(diff));

    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      
      days.push({
        dayName: dayNames[i],
        date: this.formatDate(date),
        displayDate: this.formatDisplayDate(date)
      });
    }

    return days;
  }

  generateTimeSlots(startHour: number = 9, endHour: number = 18, intervalMinutes: number = 15): string[] {
    const slots: string[] = [];
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        if (hour === endHour && minute > 0) break;
        
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    
    return slots;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private formatDisplayDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  calculateEventHeight(startTime: string, endTime: string, pixelsPerMinute: number = 1.5): number {
    const start = this.timeToMinutes(startTime);
    const end = this.timeToMinutes(endTime);
    const duration = end - start;
    return duration * pixelsPerMinute;
  }

  calculateEventTop(startTime: string, startHour: number, pixelsPerMinute: number = 1.5): number {
    const eventStart = this.timeToMinutes(startTime);
    const dayStart = startHour * 60;
    const offset = eventStart - dayStart;
    return offset * pixelsPerMinute;
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}
