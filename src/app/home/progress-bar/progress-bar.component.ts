import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit {

  title;
  message;
  color = 'accent';
  constructor(public dialogRef: MatDialogRef<ProgressBarComponent>) { }

  ngOnInit() {
  }

}
