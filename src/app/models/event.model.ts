export interface Event {
  id: string;
  title: string;
  venueId: string;
  startTime: string;
  endTime: string;  
  date: string;
  color?: string;
}

export interface Venue {
  id: string;
  name: string;
}

export interface DayTab {
  dayName: string;
  date: string;
  displayDate: string;
}
