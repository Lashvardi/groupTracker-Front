import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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
    private _getDashboardInfoService: GetDashboardInfoService,
    private cdr: ChangeDetectorRef
  ) {}

  @ViewChild('nzTemplate', { static: false }) nzTemplate!: TemplateRef<any>;
  ngOnInit() {
    this.fetchDataAndGenerateEvents();
  }
  fetchDataAndGenerateEvents() {
    this._getDashboardInfoService.getDashboardInfo().subscribe((data: any) => {
      this.data = data;
      this.generateEvents();
      this.setViewDateToEarliestEvent();
      this.cdr.detectChanges();
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

  setViewDateToEarliestEvent() {
    if (this.events.length > 0) {
      // Find the earliest start date of all events
      this.viewDate = new Date(
        Math.min(...this.events.map((e: any) => e.start))
      );
    }
  }

  hideTooltip() {
    this.hoveredEvent = null;
  }

  generateEvents() {
    let earliestSessionTime = 24;
    let latestSessionTime = 0;

    // Initialize a map to track scheduling count for each group
    const groupSchedulingCounts: {
      [groupName: string]: { [day: number]: number };
    } = {};

    this.data.forEach((group: any) => {
      // Prepare the scheduling count for the current group
      groupSchedulingCounts[group.groupName] =
        groupSchedulingCounts[group.groupName] || {};

      const groupStartDate = new Date(group.startDate);
      console.log(
        `Processing group: ${group.groupName} With Start Date: ${groupStartDate}`
      );

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

          if (startHour < earliestSessionTime) earliestSessionTime = startHour;
          if (endHour > latestSessionTime) latestSessionTime = endHour;

          // Initialize or increment the scheduling count for the specific group and day
          const dayCount =
            groupSchedulingCounts[group.groupName][session.day] || 0;
          groupSchedulingCounts[group.groupName][session.day] = dayCount + 1;

          const dateForSession = this.getUpcomingDateForDay(
            session.day,
            dayCount,
            groupStartDate
          );

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

  private getUpcomingDateForDay(
    desiredDay: number, // 0 for Monday, 6 for Sunday
    weeksToSkip: number = 0,
    startDate: Date
  ): string {
    // Log the input values for debugging
    console.log(
      `Input - Desired Day: ${desiredDay}, Weeks to Skip: ${weeksToSkip}, Start Date: ${startDate.toISOString()}`
    );

    // Adjust the current day of the week so that 0 is Monday and 6 is Sunday
    let currentDayOfWeek = startDate.getDay();
    currentDayOfWeek = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

    // Log the adjusted current day for debugging
    console.log(
      `Adjusted Current Day of Week (0=Monday, 6=Sunday): ${currentDayOfWeek}`
    );

    // Calculate the difference in days to the next occurrence of the desired day
    let dayDifference = desiredDay - currentDayOfWeek;
    // If the desired day is before the current day, or it's the current day but we want to skip to next occurrence
    if (dayDifference < 0 || (dayDifference === 0 && weeksToSkip > 0)) {
      dayDifference += 7; // Move to the next week
    }

    // Include the additional weeks to skip
    let totalDaysToAdd = dayDifference + weeksToSkip * 7;

    // Log the total days to add for debugging
    console.log(`Total Days to Add: ${totalDaysToAdd}`);

    // Create a new date by adding the total days to the start date
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + totalDaysToAdd);

    // Log the resulting date for debugging
    console.log(`Resulting Date: ${newDate.toISOString().split('T')[0]}`);

    // Return the date in YYYY-MM-DD format
    return newDate.toISOString().split('T')[0];
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
