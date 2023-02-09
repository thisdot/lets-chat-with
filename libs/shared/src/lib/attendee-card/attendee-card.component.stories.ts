import { AttendeeCardComponent } from './attendee-card.component';

export default {
  title: 'Admin/Attendee Card',
  component: AttendeeCardComponent,
};

export const Default = () => ({
  props: {
    attendee: {
      fullName: 'Shane Williamson',
      title: 'CTO',
      company: 'Sonic',
      avatarUrl: '',
    },
  },
});
