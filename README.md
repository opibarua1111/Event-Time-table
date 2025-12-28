# Event Timetable Application

A modern, feature-rich event timetable application built with Angular 21 and Angular Material.

## Features

✅ **Week View with Tabs**: Scrollable tab bar showing 7 days of the week with dates using Material UI default tab scroll behavior

✅ **Venue Management**: Display multiple venues with equal-width columns

✅ **Event Cards**: 
- Event card height is proportional to time duration
- Event card width matches venue column width
- Events display time and title
- Hover effects for better UX

✅ **Time Slots**: 
- Fixed time column on the left
- 15-minute intervals
- Scrollable time section (9:00 AM - 6:00 PM)
- Synchronized scrolling with event grid

✅ **Smart Scrolling**:
- Horizontal scrolling for venues (left-right)
- Vertical scrolling for time slots
- Sticky venue headers (remain visible when scrolling vertically)
- Fixed time column (remains visible when scrolling horizontally)

✅ **Local Storage Persistence**: All events and venues are stored in browser's local storage

✅ **Responsive Design**: Optimized for different screen sizes

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── timetable/
│   │       ├── timetable.component.ts     # Main timetable component
│   │       ├── timetable.component.html   # Timetable template
│   │       └── timetable.component.css    # Timetable styles
│   ├── models/
│   │   └── event.model.ts                 # Data models (Event, Venue, DayTab)
│   ├── services/
│   │   ├── local-storage.service.ts       # Local storage operations
│   │   └── timetable.service.ts           # Timetable utility functions
│   ├── app.config.ts                      # Application configuration
│   ├── app.routes.ts                      # Routing configuration
│   ├── app.ts                             # Root component
│   └── app.html                           # Root template
├── styles.css                             # Global styles
└── index.html                             # Main HTML file
```

## Technologies Used

- **Angular 21**: Modern web framework
- **Angular Material**: UI component library with Material Design
- **TypeScript**: Type-safe programming
- **Local Storage API**: Data persistence
- **CSS3**: Advanced styling with Flexbox

## Installation

1. Install dependencies:
```bash
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

or 

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Usage

### Default Data

The application comes with sample data:
- 3 Venues (Venue1, Venue2, Venue3)
- 3 Sample Events on 2024-12-01

### Navigation

1. **Select a Day**: Click on any tab at the top to view events for that day
2. **Scroll Venues**: Scroll horizontally to view more venues
3. **Scroll Time**: Scroll vertically to view different time slots
4. **View Event Details**: Hover over event cards to see enhanced styling

### Data Storage

All data is automatically saved to browser's local storage:
- Events persist across browser sessions
- Venues persist across browser sessions
- Data is stored in: `timetable_events` and `timetable_venues` keys

## Configuration

### Time Range
Edit `timetable.component.ts` to modify the time range:
```typescript
readonly START_HOUR = 9;   // 9:00 AM
readonly END_HOUR = 18;    // 6:00 PM
```

### Time Interval
Change the interval between time slots (default: 15 minutes):
```typescript
this.timeSlots = this.timetableService.generateTimeSlots(
  this.START_HOUR, 
  this.END_HOUR, 
  15  // Change this value
);
```

### Venue Width
Modify the venue column width:
```typescript
readonly VENUE_WIDTH = 250; // pixels
```

## Key Features Explanation

### 1. Sticky Venue Headers
The venue headers remain fixed at the top when scrolling vertically through the time slots, making it easy to track which venue you're viewing.

### 2. Fixed Time Column
The time column stays fixed on the left side when scrolling horizontally through venues.

### 3. Event Height Calculation
Event cards automatically calculate their height based on duration:
- Formula: `(end_time - start_time) * pixels_per_minute`
- Example: A 30-minute event = 45 pixels (30 * 1.5)

### 4. Event Positioning
Events are positioned using absolute positioning within their venue column:
- Top position calculated based on start time
- Height calculated based on duration

### 5. Material UI Tabs
Uses Angular Material's tab component with:
- Default scroll behavior
- Custom styling for day/date display
- Active tab highlighting

## Local Storage Structure

### Events
```json
{
  "id": "1",
  "title": "Event1",
  "venueId": "venue1",
  "startTime": "09:00",
  "endTime": "09:30",
  "date": "2024-12-01",
  "color": "#90EE90"
}
```

### Venues
```json
{
  "id": "venue1",
  "name": "Venue1"
}
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

