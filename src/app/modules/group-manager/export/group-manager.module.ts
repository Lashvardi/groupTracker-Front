import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AddGroupComponent } from '../add-group/add-group.component';
import { GroupManagerRoutingModule } from './group-manager.routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzModalModule,
    NzMessageModule,
    NzTagModule,
    NzIconModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzButtonModule,
    NzDividerModule,
    NzGridModule,
    GroupManagerRoutingModule,
  ],
  declarations: [AddGroupComponent],
})
export class GroupManagerModule {}
