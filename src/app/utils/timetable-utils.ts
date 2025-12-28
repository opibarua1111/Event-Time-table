function addEvent(title: string, venueId: string, startTime: string, endTime: string, date: string, color: string = '#90EE90') {
  const events = JSON.parse(localStorage.getItem('timetable_events') || '[]');
  const newEvent = {
    id: Date.now().toString(),
    title,
    venueId,
    startTime,
    endTime,
    date,
    color
  };
  events.push(newEvent);
  localStorage.setItem('timetable_events', JSON.stringify(events));
  window.location.reload();
}

function addVenue(name: string) {
  const venues = JSON.parse(localStorage.getItem('timetable_venues') || '[]');
  const newVenue = {
    id: `venue${Date.now()}`,
    name
  };
  venues.push(newVenue);
  localStorage.setItem('timetable_venues', JSON.stringify(venues));
  window.location.reload();
}

function clearAllEvents() {
  localStorage.removeItem('timetable_events');
  window.location.reload();
}

function clearAllVenues() {
  localStorage.removeItem('timetable_venues');
  window.location.reload();
}

function getAllEvents() {
  const events = JSON.parse(localStorage.getItem('timetable_events') || '[]');
  return events;
}

function getAllVenues() {
  const venues = JSON.parse(localStorage.getItem('timetable_venues') || '[]');
  return venues;
}

function addSampleEvents() {
  const sampleEvents = [
    {
      id: Date.now().toString(),
      title: 'Morning Meeting',
      venueId: 'venue1',
      startTime: '09:00',
      endTime: '10:00',
      date: '2024-12-02',
      color: '#87CEEB'
    },
    {
      id: (Date.now() + 1).toString(),
      title: 'Team Standup',
      venueId: 'venue2',
      startTime: '10:30',
      endTime: '11:00',
      date: '2024-12-02',
      color: '#FFB6C1'
    },
    {
      id: (Date.now() + 2).toString(),
      title: 'Lunch Break',
      venueId: 'venue3',
      startTime: '12:00',
      endTime: '13:00',
      date: '2024-12-02',
      color: '#98FB98'
    },
    {
      id: (Date.now() + 3).toString(),
      title: 'Project Review',
      venueId: 'venue1',
      startTime: '14:00',
      endTime: '15:30',
      date: '2024-12-02',
      color: '#DDA0DD'
    },
    {
      id: (Date.now() + 4).toString(),
      title: 'Training Session',
      venueId: 'venue2',
      startTime: '15:45',
      endTime: '17:00',
      date: '2024-12-02',
      color: '#F0E68C'
    }
  ];

  const events = JSON.parse(localStorage.getItem('timetable_events') || '[]');
  const updatedEvents = [...events, ...sampleEvents];
  localStorage.setItem('timetable_events', JSON.stringify(updatedEvents));
  window.location.reload();
}

if (typeof window !== 'undefined') {
  (window as any).timetableUtils = {
    addEvent,
    addVenue,
    clearAllEvents,
    clearAllVenues,
    getAllEvents,
    getAllVenues,
    addSampleEvents
  };
}

