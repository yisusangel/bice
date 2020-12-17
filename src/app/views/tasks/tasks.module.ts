import {NgModule} from '@angular/core';

import {TasksComponent} from './tasks.component';
import {CommonModule} from '@angular/common';
import {TasksRoutingModule} from './tasks-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    declarations: [
        TasksComponent
    ],
    imports: [
        CommonModule,
        TasksRoutingModule,
        MatTableModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSlideToggleModule,
        NgbPaginationModule
    ]
})
export class TasksModule {}
