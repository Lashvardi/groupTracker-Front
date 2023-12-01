import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GetDashboardInfoService } from '../extensions/get-dashboard-info.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  events: CalendarEvent[] = [];
  hoveredEvent: CalendarEvent | null = null;
  modalRef: any = null;
  daySchedulingCount: { [key: number]: number } = {};
  viewDate: Date = new Date();
  minHour: number = 10; // Start time of your working hours
  maxHour: number = 22; // End time of your working hours

  data: any = [];

  constructor(
    private _modalService: NzModalService,
    private _getDashboardInfoService: GetDashboardInfoService
  ) {}

  @ViewChild('nzTemplate', { static: false }) nzTemplate!: TemplateRef<any>;
  ngOnInit() {
    this.generateEvents();

    this._getDashboardInfoService.getDashboardInfo().subscribe((res) => {
      this.data = res;
      this.generateEvents();
    });
  }
  showTooltip(event: any) {
    this.hoveredEvent = event.event;
    this.modalRef = this._modalService.create({
      nzTitle: 'Event Details',
      nzContent: this.nzTemplate,
      nzFooter: null,
      nzClosable: false,
      nzMask: false,
      nzMaskClosable: false,
    });
  }

  hideTooltip() {
    this.hoveredEvent = null;
  }
  isTimeSlotAvailable(events: any, proposedStart: any, proposedEnd: any) {
    for (let event of events) {
      if (
        (proposedStart >= event.start && proposedStart < event.end) ||
        (proposedEnd > event.start && proposedEnd <= event.end) ||
        (event.start >= proposedStart && event.start < proposedEnd)
      ) {
        return false; // This means there is a collision
      }
    }
    return true; // No collision, time slot is available
  }

  generateEvents() {
    this.events = [];

    this.data.forEach((group: any) => {
      group.sessions.forEach((session: any) => {
        let weekNumber = 0;
        let start, end;
        let isAvailable;

        do {
          const dateForSession = this.getUpcomingDateForDay(
            session.day,
            group.startDate,
            weekNumber
          );
          const startHour = parseInt(
            session.time.split('-')[0].split(':')[0],
            10
          );
          const endHour = parseInt(
            session.time.split('-')[1].split(':')[0],
            10
          );
          start = new Date(`${dateForSession}T${startHour}:00`);
          end = new Date(`${dateForSession}T${endHour}:00`);
          isAvailable = this.isTimeSlotAvailable(this.events, start, end);

          if (!isAvailable) {
            weekNumber++; // Try next week
          }
        } while (!isAvailable);

        // Push the event into the calendar
        this.events.push({
          start,
          end,
          title: `${group.groupName} | ${session.auditorium} | ${session.time}`,
          color: session.isOnline
            ? { primary: '#ad2121', secondary: '#FAE3E3' }
            : { primary: '#1e90ff', secondary: '#D1E8FF' },
          meta: {
            detail: `${group.companyName} | ${group.groupName} (${group.grade}) | Auditorium: ${session.auditorium} | Time: ${session.time}`,
            isOnline: session.isOnline,
            isAlternate: session.isAlternate,
          },
        });
      });
    });
  }

  private getUpcomingDateForDay(
    day: number,
    startDate: string,
    weekNumber: number = 0
  ): string {
    const start = new Date(startDate);
    let daysToAdd = (day - start.getDay() + 7) % 7 + 1;
    daysToAdd += 7 * weekNumber; // Move to the correct week
    const upcomingDate = new Date(start);
    upcomingDate.setDate(start.getDate() + daysToAdd);

    return upcomingDate.toISOString().split('T')[0];
  }

  prevWeek(): void {
    const date = new Date(this.viewDate);
    date.setDate(date.getDate() - 7);
    this.viewDate = date;
  }

  nextWeek(): void {
    const date = new Date(this.viewDate);
    date.setDate(date.getDate() + 7);
    this.viewDate = date;
  }
}
