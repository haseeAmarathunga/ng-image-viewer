import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-lead-facility',
  templateUrl: './lead-facility.component.html',
  styleUrls: ['./lead-facility.component.scss']
})
export class LeadFacilityComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<LeadFacilityComponent>) { }
  form: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });
  }

  onAdd() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
