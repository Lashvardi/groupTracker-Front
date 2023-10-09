import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { HomeComponent } from '../home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TeacherSubjectsComponent } from '../../auth/teacher-subjects/teacher-subjects.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzModalModule,
    NzMessageModule,
    DashboardRoutingModule,
    NzTagModule,
    NzIconModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzButtonModule,
    NzDividerModule,
  ],
  declarations: [HomeComponent],
})
export class DashboardModule {}
