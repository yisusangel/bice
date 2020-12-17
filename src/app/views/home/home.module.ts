import {NgModule} from '@angular/core';

import {HomeComponent} from './home.component';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card'; 
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatTableModule,
        MatCardModule,
        MatDividerModule
    ]
})
export class HomeModule {}
