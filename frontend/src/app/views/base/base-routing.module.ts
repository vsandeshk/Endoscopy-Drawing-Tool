import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsComponent } from './cards.component';
import { Cards2Component } from './cards2.component';
import { UploadComponent } from './upload.component';
import { ImageDrawingComponent } from './image-drawing.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard'
    },
    children: [
      {
        path: 'images/edit',
        component: ImageDrawingComponent,
        data: {
          title: "Edit Image"
        }
      },
      {
        path: 'images/upload',
        component: UploadComponent,
        data: {
          title: "Upload Image"
        }
      },
      {
        path: 'images/private',
        component: CardsComponent,
        data: {
          title: 'My Images'
        }
      },
      {
        path: '',
        redirectTo: 'images/public'
      },
      {
        path: 'images/public',
        component: Cards2Component,
        data: {
          title: 'Public Images'
        }
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
