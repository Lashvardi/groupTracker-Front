import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss']
})
export class GroupCardComponent {
  @Input() groupName: string = '';
  @Input() groupGrade: string = '';
  @Input() groupSubject: string = '';
  @Input() groupCompany: string = '';
  @Input() groupAuditorium: string = '';
  @Input() groupTime: string = '';
  @Input() CurrentLecture: string = '';
  @Input() groupDay: string = '';
  @Input() groupProgress: string = '';
}
