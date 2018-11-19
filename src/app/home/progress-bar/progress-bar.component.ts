import { Component, OnInit, Inject, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProgressBarService } from './progress-bar.service';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  title = 'please wait';
  message;
  color = 'ancent';
  loadingTime = 1000;
  constructor(public dialogRef: MatDialogRef<ProgressBarComponent>) { }

  ngOnInit() {
  }
  /* openLoader() {
    this.progressBarService.open(this.title);
    setTimeout(() => {
      this.progressBarService.close();
    }, this.loadingTime);
  } */
}
