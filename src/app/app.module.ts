import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {NgImageViewerModule} from '../../projects/ng-image-viewer/src/lib/ng-image-viewer.module';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { LeadFacilityComponent } from './add-lead/lead-facility/lead-facility.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule, MatPaginatorModule,
  MatSelectModule, MatTableModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    AddLeadComponent,
    LeadFacilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgImageViewerModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LeadFacilityComponent]
})
export class AppModule { }
