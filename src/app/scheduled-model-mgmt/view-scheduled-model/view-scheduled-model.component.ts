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
  selectedType;
  services = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Men International' },
    { id: 2, name: 'Women International' },
    { id: 3, name: 'Men National' },
    { id: 4, name: 'Women National' },
  ];
  constructor(private fb: FormBuilder, private router: Router, private scheduledmodelService: ScheduledModelService,
     private dashBoardService: DashBoardService) { }
  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.allModels();
    this.createForm();
    this.onSelect(this.services[0]);
  }
  createForm() {
    this.viewModelForm = this.fb.group({
      id: ['']
    });
  }
  onSelect(service): void {
    switch (service.id) {
      case 0: {
        this.allModels();
        break;
      }
      case 1: {
        this.interNationalMenModels();
        break;
      }
      case 2: {
        this.interNationalWomenModels();
        break;
      }
      case 3: {
        this.nationalMenModels();
        break;
      }
      case 4: {
        this.nationalWomenModels();
        break;
      }
  }
  this.selectedType = service;
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
    this.router.navigate(['/dashboard/scheduledmodelBooking', modelId]);
  }
}
