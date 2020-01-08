import { NgModule } from '@angular/core';
import { NgImageViewerComponent } from './ng-image-viewer.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [NgImageViewerComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [NgImageViewerComponent]
})
export class NgImageViewerModule { }
