import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {StatusService} from '../status.service';
import { Status} from './status.model';


@Component({
  selector: 'app-stauts',
  templateUrl: './stauts.component.html',
  styleUrls: ['./stauts.component.css']
})
export class StautsComponent implements OnInit {
  id: string;
  statusForm: FormGroup;
  status: Status[] = [];
  progress: boolean;
  completed: boolean;
  displayStatus: boolean;
  materialPicked: boolean;
  materialPickedTrue: boolean;
  shootCompleted: boolean;
  shootCompletedTrue: boolean;
  imageEditing: boolean;
  imageEditingTrue: boolean;
  delivery: boolean;
  deliveryTrue: boolean;
  payment: boolean;
  paymentTrue: boolean;
  materialReturn: boolean;
  materialReturnTrue: boolean;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private statusService: StatusService ) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log( this.id);
  }

  ngOnInit() {
    this.findStatus(this.id);
    this.createForm();
  }

 createForm() {
  this.statusForm = this.fb.group({
    order: ['']
  });
}

findStatus(statusId) {
  this.statusService.getStatus(this.id).subscribe(status => {
    this.status.push(status) ;
    switch (status.order) {
      case false: {
        this.progress = true;
        break;
      }
      case true: {
        this.completed = true;
        break;
      }
    }

    switch (status.materialPickedUp) {
      case false: {
        this.materialPicked = true;
        break;
      }
      case true: {
        this.materialPickedTrue = true;
        break;
      }

    }

    switch (status.shootCompleted) {
      case false: {
        this.shootCompleted = true;
        break;
      }
      case true: {
        this.shootCompletedTrue = true;
        break;
      }
    }

    switch (status.imageEditing) {
      case false: {
        this.imageEditing = true;
        break;
      }
      case true: {
        this.imageEditingTrue = true;
        break;
      }
    }

    switch (status.delivery) {
      case false: {
        this.delivery = true;
        break;
      }
      case true: {
        this.deliveryTrue = true;
        break;
      }
    }
    switch (status.payment) {
      case false: {
        this.payment = true;
        break;
      }
      case true: {
        this.paymentTrue = true;
        break;
      }
    }

    switch (status.materialReturn) {
      case false: {
        this.materialReturn = true;
        break;
      }
      case true: {
        this.materialReturnTrue = true;
        break;
      }
    }
          console.log( this.status);
        }, error => {
          console.log(error);
        });
      }

      statusView() {
        this.displayStatus = true;
      }



}

