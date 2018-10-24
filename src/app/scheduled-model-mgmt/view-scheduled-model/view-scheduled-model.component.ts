import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import {Model} from './model-detail.model';
import {ScheduledModelService} from '../scheduled-model.service';
import {DashBoardService} from '../../home/dashboard/dashboard.service';

@Component({
  selector: 'app-view-scheduled-model',
  templateUrl: './view-scheduled-model.component.html',
  styleUrls: ['./view-scheduled-model.component.css']
})
export class ViewScheduledModelComponent implements OnInit {

  viewModelForm: FormGroup;
  Detail: Model;
  showMessage: boolean;
  selected = 'All';
  constructor(private fb: FormBuilder, private router: Router, private scheduledmodelService: ScheduledModelService,
     private dashBoardService: DashBoardService) { }
  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.allModels();
    this.createForm();
  }
  createForm() {
    this.viewModelForm = this.fb.group({
      id: ['']
    });
  }

  allModels() {
    this.scheduledmodelService.getScheduledModelDetails().subscribe(data => {
      this.Detail = data;
      if (data.length === 0) {
this.showMessage = true;
      } else if (data.length !== 0) {
        this.showMessage = false;
      }
    });
  }
  /* menModels() {
    this.modelService.getMenDetails().subscribe(data => {
      this.Detail = data;
    });
  }
  womenModels() {
    this.modelService.getWomenDetails().subscribe(data => {
      this.Detail = data;
    });
  }
   */
  nationalMenModels() {
    this.scheduledmodelService.getNationalMenModels().subscribe(data => {
      this.Detail = data;
      if (data.length === 0) {
this.showMessage = true;
      } else if (data.length !== 0) {
        this.showMessage = false;
      }
    });
  }
  nationalWomenModels() {
    this.scheduledmodelService.getNationalWomenModels().subscribe(data => {
      this.Detail = data;
      if (data.length === 0) {
this.showMessage = true;
      } else if (data.length !== 0) {
        this.showMessage = false;
      }
    });
  }
  interNationalMenModels() {
    this.scheduledmodelService.getInterNationalMenModels().subscribe(data => {
      this.Detail = data;
      if (data.length === 0) {
this.showMessage = true;
      } else if (data.length !== 0) {
        this.showMessage = false;
      }
    });
  }
  interNationalWomenModels() {
    this.scheduledmodelService.getInterNationalWomenModels().subscribe(data => {
      this.Detail = data;
      if (data.length === 0) {
this.showMessage = true;
      } else if (data.length !== 0) {
        this.showMessage = false;
      }
    });
  }
  bookModel(viewModelForm: FormGroup, modelId: any) {
    console.log(modelId);
    this.router.navigate(['/scheduledmodelBooking', modelId]);
  }

}
