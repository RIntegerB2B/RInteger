import { Component, OnInit } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatStepper } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _moment from 'moment';
/* import {
  default as _rollupMoment, Moment } from 'moment';
 */
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
import {
  Moment
} from 'moment';
import { StatusService } from '../status.service';

import {DigitalMgmtStatus} from '../stauts-view/account-mgmt-status.model';

@Component({
  selector: 'app-account-mgmt-status',
  templateUrl: './account-mgmt-status.component.html',
  styleUrls: ['./account-mgmt-status.component.css'],
 /*  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ] */

})
export class AccountMgmtStatusComponent implements OnInit {
  bookingID;
  monthToString: any;
  monthToString2: any;
  yearToString: any;
  showEditing3: boolean;
  selectedYear3: any;
  showYear3: boolean;
  selectedMonth3: any;
  showForms3: boolean;
  selectedWeek2: any;
  selectedYear2: any;
  selectedMonth2: any;
  showYear2: boolean;
  showForms2: boolean;
  no;
 /*  isLinear = true; */
  showForms: boolean;
  showYear: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
/*   monthlyPlanModel: AddMonthlyPlan; */
  Status: DigitalMgmtStatus[];
  WeeklyStatus: DigitalMgmtStatus[];
  DailyStatus: DigitalMgmtStatus[];
/*   WeeklyModel: WeeklyPlan;
  DailyModel: DailyPlan; */
  showAdd: boolean;
  showEditing: boolean;
  showEditing2: boolean;
  month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  year = ['2018', '2019', '2020'];
  week = ['Week1', 'Week2', 'Week3', 'Week4'];
  selectedMonth;
  selectedYear;
  selectedWeek;
  selected = 'All';
  status = ['Planned', 'Started', 'Progress', 'Pending', 'Cancel', 'Completed', 'Update'];
  message;
  action;
  noresult = false;
  selectedMonthName;
  selectedYearName;
  monthName;
  yearValue;
  date = new FormControl(moment());
  ctrlValue;
  montherror: boolean;
  titleToSent;
  title;
  allowMonth = false;
  notificationBody;
  hideData: number;
  notificationModel: Notification;
  mobileNo;
  montherror1: boolean;
  montherror2: boolean;
StatusModel: DigitalMgmtStatus;
  constructor(private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, private dialog: MatDialog, private router: Router,
     private statusService: StatusService) {
    this.bookingID = this.activatedRoute.snapshot.paramMap.get('data');
  }

  ngOnInit() {
    this.getStatus();
    this.firstFormGroup = this._formBuilder.group({
      _id: [''],
      monthId: [''],
      title: [''],
      Description: [''],
      updTitle: [''],
      updDesc: [''],
      tempmonth: [''],
      tempyear: [''],
      newdate: ['', Validators.required],
      monthName: ['',  Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      _id: [''],
      weekId: [''],
      title1: [''],
      Description1: [''],
      updTitle1: [''],
      updDesc1: [''],
      date: [''],
      updWeek1: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      _id: [''],
      dateID: [''],
      title2: [''],
      Description2: [''],
      updTitle2: [''],
      updDesc2: [''],
      dailydate: [''],
      copyToDate: [''],
    });
  }
  chosenYearHandler(normlizedMonth: Moment) {
    this.yearValue = moment(normlizedMonth).year();
    this.yearToString = this.yearValue.toString();
    console.log(this.yearToString);
  }
  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    this.ctrlValue = moment(normlizedMonth).month();
    this.monthToString = this.ctrlValue.toString();
    /*   console.log('calendar month', this.monthToString); */
    switch (this.ctrlValue) {
      case 0: {
        this.monthName = 'January';
        break;
      }
      case 1: {
        this.monthName = 'February';
        break;
      }
      case 2: {
        this.monthName = 'March';
        break;
      }
      case 3: {
        this.monthName = 'April';
        break;
      }
      case 4: {
        this.monthName = 'May';
        break;
      }
      case 5: {
        this.monthName = 'June';
        break;
      }
      case 6: {
        this.monthName = 'July';
        break;
      }
      case 7: {
        this.monthName = 'August';
        break;
      }
      case 8: {
        this.monthName = 'September';
        break;
      }
      case 9: {
        this.monthName = 'October';
        break;
      }
      case 10: {
        this.monthName = 'November';
        break;
      }
      case 11: {
        this.monthName = 'December';
        break;
      }
    }
    console.log(this.monthName);
    this.firstFormGroup.controls.newdate.setValue(normlizedMonth);
    datepicker.close();
  }
  showForm() {
    this.showForms = true;
  }
  getStatus( ) {
    this.showForms = true;
    this.statusService.getAccountMgmtStatus(this.bookingID).subscribe(data => {
      this.selectedMonthName = data[0].monthName;
      this.selectedYearName = data[0].year;
      this.Status = data;
        if (data.length === 0) {
          this.noresult = true;
        } else {
          this.noresult = false;
        }
      }, error => {
        console.log(error);
      });
    this.viewAllWeeklyPlan();
    this.viewDailyPlan();
  }
  viewAllWeeklyPlan() {
    this.statusService.getAccountMgmtStatus(this.bookingID).subscribe(data => {
      this.selectedMonthName = data[0].monthName;
      this.selectedYearName = data[0].year;
      this.Status = data;
        if (data.length === 0) {
          this.noresult = true;
        } else {
          this.noresult = false;
        }
      }, error => {
        console.log(error);
      });
    this.showForm2();
  }
  viewDailyPlan() {
    this.statusService.getAccountMgmtStatus(this.bookingID).subscribe(data => {
      this.selectedMonthName = data[0].monthName;
      this.selectedYearName = data[0].year;
      this.Status = data;
        if (data.length === 0) {
          this.noresult = true;
        } else {
          this.noresult = false;
        }
      }, error => {
        console.log(error);
      });
    this.showForm3();
  }
  showForm3() {
    this.showForms3 = true;
  }
  showForm2() {
    this.showForms2 = true;
  }
}
