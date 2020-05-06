import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {LeadFacilityComponent} from './lead-facility/lead-facility.component';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss']
})
export class AddLeadComponent implements OnInit {
  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  constructor(private dialog: MatDialog) { }
  form: FormGroup;
  displayedColumns: string[] = ['name', 'amount'];
  dataSource = new MatTableDataSource<LeadFacility>([]);
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      telephone: new FormControl('')
    });
  }

  openLeadFac() {
    const dialogRef = this.dialog.open(LeadFacilityComponent, {
      width: '500px',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((data: LeadFacility) => {
      if (data) {
        const newData: LeadFacility[] = this.dataSource.data;
        newData.push(data);
        this.dataSource.data = newData;
      }
    });
  }

  onSave() {
    if (this.form.valid) {
      const leadFacData = {
        ...this.form.value,
        leadFac: this.dataSource.data
      };
      console.log('Lead Fac Data : ', leadFacData);
    }
  }
}

export class LeadFacility {
  name: string;
  amount: number;
}
