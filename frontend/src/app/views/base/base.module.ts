// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CardsComponent } from './cards.component';
import { Cards2Component } from './cards2.component';

// Forms Component


// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { UploadComponent } from './upload.component';
import { ImageDrawingComponent } from './image-drawing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseRoutingModule,

  ],
  declarations: [
    CardsComponent,
    Cards2Component,
    UploadComponent,
    ImageDrawingComponent,
  ]
})
export class BaseModule { }
