# Event Timetable - Implementation Guide

## Overview
This document provides a detailed explanation of how the Event Timetable application was implemented to meet all the specified requirements.

## Requirements Implementation

### ✅ 1. Week View Tabs (7 Days with Dates)
**Requirement**: User Tab bar to show 7 days of week with date, Make sure its scrollable. Use default tab scroll behaviour of material ui.

**Implementation**:
- Used Angular Material's `mat-tab-group` component
- Configured with `mat-stretch-tabs="false"` to enable default scroll behavior
- Each tab displays:
  - Day name (Monday, Tuesday, etc.)
  - Full date (Format: YYYY-MM-DD)
- Week generation starts from Monday of the current week
- Located in: `timetable.component.html` and `timetable.component.ts`

**Code Reference**:
```typescript
// Service: timetable.service.ts
generateWeekDays(startDate?: Date): DayTab[] {
  // Generates 7 days starting from Monday
  // Returns array of { dayName, date, displayDate }
}
```

### ✅ 2. Venue Section with List of Venues
**Requirement**: Below the tabbar there is a venue section where i can see list of venues

**Implementation**:
- Venue headers displayed in a sticky container below the tab bar
- Each venue box rendered with equal width (250px)
- Venues loaded from local storage
- Venue bar remains sticky when scrolling vertically
- Located in: `timetable.component.html` (venue-headers section)

**Code Reference**:
```css
.venue-headers {
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
}
```

### ✅ 3. Equal Width Venue Boxes
**Requirement**: All Venue boxes has same width

**Implementation**:
- Constant `VENUE_WIDTH = 250` defined in component
- All venue columns and headers use this constant
- Ensures perfect alignment between headers and event columns
- Located in: `timetable.component.ts`

**Code Reference**:
```typescript
readonly VENUE_WIDTH = 250; // All venues use this width
```

### ✅ 4. Event Card Sizing
**Requirement**: Each event card's Height is equal to time duration, width is equal to venue box's width

**Implementation**:
- **Height Calculation**: 
  - Formula: `(endTime - startTime) * PIXELS_PER_MINUTE`
  - Example: 30-minute event = 45px height (30 * 1.5)
  - Service method: `calculateEventHeight()`
  
- **Width**: 
  - Matches venue box width (250px)
  - Applied via dynamic styling

**Code Reference**:
```typescript
getEventStyle(event: Event): any {
  const height = this.timetableService.calculateEventHeight(
    event.startTime, 
    event.endTime, 
    this.PIXELS_PER_MINUTE
  );
  return {
    height: `${height}px`,
    width: `${this.VENUE_WIDTH}px`,
    // ... other styles
  };
}
```

### ✅ 5. Time Section with 15-Minute Intervals
**Requirement**: On the left there is Time section whole time section is scrollable and it will fixed in that position, and distance of every time is 15 mins

**Implementation**:
- Time column fixed on the left side (80px width)
- Displays time slots from 9:00 AM to 6:00 PM
- Each slot represents 15 minutes (22.5px height)
- Scrollable independently with synchronized scrolling
- Remains fixed when scrolling horizontally

**Code Reference**:
```typescript
readonly TIME_SLOT_HEIGHT = 22.5; // 15 minutes * 1.5 pixels per minute
timeSlots = this.timetableService.generateTimeSlots(9, 18, 15);
```

### ✅ 6. Smart Scrolling System
**Requirement**: Whole grey section (venue bar + event area) is scrollable horizontally (Left-right), but if i scroll vertically venue bar should be sticky

**Implementation**:
- **Horizontal Scrolling**: 
  - Scrollable content area allows left-right scrolling for venues
  - Time column remains fixed during horizontal scroll
  
- **Vertical Scrolling**:
  - Events container scrollable vertically
  - Venue headers remain sticky at the top
  - Time slots scroll in sync with events

**Code Reference**:
```css
/* Venue headers - sticky during vertical scroll */
.venue-headers {
  position: sticky;
  top: 0;
  z-index: 40;
}

/* Time column - fixed during horizontal scroll */
.time-column {
  flex-shrink: 0;
  z-index: 50;
}

/* Scrollable content - allows both directions */
.scrollable-content {
  overflow: auto;
}
```

### ✅ 7. Local Storage for Data Persistence
**Requirement**: Use local storage for data persistence and other operations

**Implementation**:
- Service: `LocalStorageService` handles all storage operations
- Two storage keys:
  - `timetable_events`: Stores all events
  - `timetable_venues`: Stores all venues
- CRUD operations implemented:
  - Create: `addEvent()`, `addVenue()`
  - Read: `getEvents()`, `getVenues()`, `getEventsByDate()`
  - Update: `updateEvent()`
  - Delete: `deleteEvent()`, `deleteVenue()`
- Default data initialized on first load

**Code Reference**:
```typescript
// LocalStorageService provides:
- getEvents(): Event[]
- saveEvents(events: Event[]): void
- addEvent(event: Event): void
- updateEvent(eventId: string, updatedEvent: Event): void
- deleteEvent(eventId: string): void
- getEventsByDate(date: string): Event[]
```

## Architecture

### Component Structure
```
TimetableComponent
├── Day Tabs (Material UI)
├── Time Column (Fixed Left)
└── Scrollable Content
    ├── Venue Headers (Sticky Top)
    └── Events Grid
        └── Venue Columns (with Events)
```

### Data Flow
```
LocalStorage
    ↓
LocalStorageService
    ↓
TimetableComponent
    ↓
Template (HTML)
```

### Styling Architecture
```
Global Styles (styles.css)
├── Material Theme
└── Base Reset

Component Styles (timetable.component.css)
├── Layout (Flexbox)
├── Scrolling Behavior
├── Sticky Positioning
└── Visual Design
```

## Key Technical Decisions

### 1. Absolute Positioning for Events
**Why**: Allows precise placement based on time
**Implementation**: Events positioned within venue columns using calculated top offset

### 2. Flexbox Layout
**Why**: Flexible and responsive layout system
**Implementation**: Used for main layout, venue headers, and event grid

### 3. CSS Sticky Positioning
**Why**: Native browser support, performant
**Implementation**: Venue headers use `position: sticky`

### 4. Pixel-Perfect Calculations
**Why**: Ensures visual accuracy for time-based positioning
**Implementation**: 
- 1.5 pixels per minute
- 22.5px per 15-minute slot
- Consistent spacing throughout

### 5. Standalone Components
**Why**: Modern Angular best practice
**Implementation**: All components are standalone with explicit imports

## Performance Considerations

### 1. Change Detection
- Uses default change detection strategy
- Efficient data filtering per venue

### 2. Event Rendering
- Events only rendered for selected date
- Filtered at component level before rendering

### 3. Scrolling Performance
- Native CSS scrolling (hardware accelerated)
- Custom scrollbar styling for better UX

## Browser DevTools Console Utilities

Utility functions available in browser console:

```javascript
// Add event
timetableUtils.addEvent('Meeting', 'venue1', '10:00', '11:00', '2024-12-02', '#FFB347');

// Add venue
timetableUtils.addVenue('Auditorium');

// View all events
timetableUtils.getAllEvents();

// Clear all data
timetableUtils.clearAllEvents();
```

## Testing Checklist

- [x] Week tabs display correctly
- [x] Tab scrolling works (Material UI default behavior)
- [x] Venue headers display
- [x] Venue headers stay sticky on vertical scroll
- [x] Time column stays fixed on horizontal scroll
- [x] Events display with correct height (duration-based)
- [x] Events display with correct width (venue width)
- [x] Events positioned at correct time
- [x] Horizontal scrolling works for venues
- [x] Vertical scrolling works for time slots
- [x] Data persists in local storage
- [x] Different dates can be selected
- [x] Responsive on different screen sizes

## Customization Guide

### Change Time Range
Edit in `timetable.component.ts`:
```typescript
readonly START_HOUR = 8;   // Start at 8:00 AM
readonly END_HOUR = 20;    // End at 8:00 PM
```

### Change Time Intervals
Edit in `timetable.component.ts`:
```typescript
this.timeSlots = this.timetableService.generateTimeSlots(
  this.START_HOUR, 
  this.END_HOUR, 
  30  // 30-minute intervals instead of 15
);
```

### Change Venue Width
Edit in `timetable.component.ts`:
```typescript
readonly VENUE_WIDTH = 300; // Wider venue columns
```

### Change Pixels Per Minute
Edit in `timetable.component.ts`:
```typescript
readonly PIXELS_PER_MINUTE = 2; // More space for each minute
```

### Add More Default Venues
Edit in `local-storage.service.ts`:
```typescript
const defaultVenues: Venue[] = [
  { id: 'venue1', name: 'Venue1' },
  { id: 'venue2', name: 'Venue2' },
  { id: 'venue3', name: 'Venue3' },
  { id: 'venue4', name: 'Conference Room A' }, // Add new
  { id: 'venue5', name: 'Auditorium' }         // Add new
];
```

## Color Palette

Default event colors used:
- `#90EE90` - Light Green
- `#FFB347` - Orange
- `#87CEEB` - Light Blue
- `#FFB6C1` - Light Pink
- `#98FB98` - Pale Green
- `#DDA0DD` - Plum
- `#F0E68C` - Khaki

Venue header:
- `#e8e8e8` - Light Grey

Time grid:
- `#f0f0f0` - Very Light Grey (15-min lines)
- `#e0e0e0` - Light Grey (hour lines)

## Accessibility Features

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support (Material UI tabs)
- High contrast colors
- Clear visual hierarchy
- Readable font sizes

## Known Limitations

1. Events can overlap if scheduled at same time in same venue
2. No conflict detection for overlapping events
3. No drag-and-drop functionality
4. No backend integration
5. Data only persists in current browser

## Future Enhancement Ideas

1. **Event Management UI**
   - Add/Edit/Delete events via forms
   - Drag and drop to reschedule
   - Resize events to change duration

2. **Advanced Features**
   - Conflict detection and warnings
   - Event categories and colors
   - Search and filter events
   - Multiple view modes (day/week/month)

3. **Collaboration**
   - Multi-user support
   - Real-time updates
   - Backend API integration

4. **Export/Import**
   - Export to iCal/CSV
   - Import from external calendars
   - Print-friendly view

5. **Mobile Optimization**
   - Touch gestures
   - Mobile-specific layout
   - Progressive Web App (PWA)

## Troubleshooting

### Events not displaying
- Check browser console for errors
- Verify data in local storage: `localStorage.getItem('timetable_events')`
- Ensure date format is correct (YYYY-MM-DD)
- Verify venue IDs match

### Scrolling not working
- Check browser compatibility
- Verify CSS overflow properties
- Ensure content exceeds container size

### Sticky headers not working
- Check browser support for position: sticky
- Verify z-index values
- Ensure parent containers don't have overflow: hidden

## Conclusion

This implementation successfully meets all specified requirements with:
- Clean, maintainable code structure
- Modern Angular best practices
- Responsive and performant UI
- Local storage integration
- Good user experience
- Extensible architecture for future enhancements
