import { NgModule } from '@angular/core';
import { NgImageViewerComponent } from './ng-image-viewer.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [NgImageViewerComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [NgImageViewerComponent]
})
export class NgImageViewerModule { }
