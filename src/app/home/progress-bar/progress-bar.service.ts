import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ProgressBarComponent } from './progress-bar.component';
@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  dialogRef: MatDialogRef<ProgressBarComponent>;
  constructor(private dialog: MatDialog) { }
  /* : Observable<boolean>  */
  public open(title: string = 'Please wait') {
    this.dialogRef = this.dialog.open(ProgressBarComponent,
       { disableClose: true, backdropClass: 'light-backdrop'});
    this.dialogRef.updateSize('200px');
    this.dialogRef.componentInstance.title = title;
    return this.dialogRef.afterClosed();
  }
  public close() {
    if (this.dialogRef)     {
      this.dialogRef.close();
    }
  }
}
