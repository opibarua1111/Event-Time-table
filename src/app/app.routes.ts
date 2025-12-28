import { Routes } from '@angular/router';
import { TimetableComponent } from './components/timetable/timetable.component';

export const routes: Routes = [
  { path: '', component: TimetableComponent },
  { path: '**', redirectTo: '' }
];
