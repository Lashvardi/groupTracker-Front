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
  minHour: number = 0;
  maxHour: number = 24;

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

  generateEvents() {
    let earliestSessionTime = 24;
    let latestSessionTime = 0;

    this.data.forEach((group: any) => {
      group.sessions
        .sort((a: any, b: any) => a.day - b.day)
        .forEach((session: any) => {
          const startHour = parseInt(
            session.time.split('-')[0].split(':')[0],
            10
          );
          const endHour = parseInt(
            session.time.split('-')[1].split(':')[0],
            10
          );

          const DisplaystartHour = session.time.split('-')[0];
          const DisplayendHour = session.time.split('-')[1];

          if (startHour < earliestSessionTime) {
            earliestSessionTime = startHour;
          }
          if (endHour > latestSessionTime) {
            latestSessionTime = endHour;
          }

          if (!this.daySchedulingCount[session.day]) {
            this.daySchedulingCount[session.day] = 0;
          }

          const dateForSession = this.getUpcomingDateForDay(
            session.day,
            this.daySchedulingCount[session.day]
          );

          this.daySchedulingCount[session.day]++;

          const start = new Date(`${dateForSession}T${startHour}:00`);
          const end = new Date(`${dateForSession}T${endHour}:00`);

          this.events.push({
            start,
            end,
            title: `${group.groupName} | ${session.auditorium} | ${DisplaystartHour}-${DisplayendHour}`,
            color: session.isOnline
              ? { primary: '#ad2121', secondary: '#FAE3E3' }
              : { primary: '#1e90ff', secondary: '#D1E8FF' },
            meta: {
              detail: `${group.companyName} | ${group.groupName} (${group.grade}) | Auditorium: ${session.auditorium} | Time: ${DisplaystartHour} to ${DisplayendHour}`,
              isOnline: session.isOnline,
              isAlternate: session.isAlternate,
            },
          });
        });
    });

    this.minHour = earliestSessionTime;
    this.maxHour = latestSessionTime;
  }

  private getUpcomingDateForDay(day: number, weeksToSkip: number = 0): string {
    const now = new Date();
    let daysToAdd = ((day - now.getDay() + 7) % 7) + 7 * weeksToSkip;

    now.setDate(now.getDate() + daysToAdd);
    return now.toISOString().split('T')[0];
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
