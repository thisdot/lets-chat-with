import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';
import { BanAttendee, DismissAttendee } from '../interfaces/reports.interfaces';

export const BAN_SUBJECT_TOKEN = new InjectionToken<Subject<BanAttendee>>('');

export const DISMISS_SUBJECT_TOKEN = new InjectionToken<Subject<DismissAttendee>>('');
