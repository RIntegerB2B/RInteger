import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {StatusService} from '../status.service';

@Component({
  selector: 'app-stauts-view',
  templateUrl: './stauts-view.component.html',
  styleUrls: ['./stauts-view.component.css']
})
export class StautsViewComponent implements OnInit {
  no: string;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private statusService: StatusService ) {
      this.no = this.activatedRoute.snapshot.paramMap.get('no');
     }

  ngOnInit() {
    this.statusView(this.no);
  }

  statusView(no) {
    this.statusService.getStatusByNum(no).subscribe(data => {
            console.log(data);
          }, error => {
            console.log(error);
          });


  }
}
