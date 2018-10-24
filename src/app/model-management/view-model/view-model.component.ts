import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ModelManagementService } from '../model-management.service';
import { Model } from './model.model';
import { ServiceProviders } from './service-provider.model';
import {DashBoardService} from '../../home/dashboard/dashboard.service';


@Component({
  selector: 'app-view-model',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.css']
})
export class ViewModelComponent implements OnInit {
  viewModelForm: FormGroup;
  Detail: Model;
  selected = 'All';
  showMessage: boolean;
  serviceProvider: ServiceProviders;
  serviceProviderId;
  constructor(private fb: FormBuilder, private router: Router, private modelService: ModelManagementService,
     private dashBoardService: DashBoardService) { }
  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.allModels();
    this.createForm();
    this.serviceProviders();
  }
  createForm() {
    this.viewModelForm = this.fb.group({
      id: ['']
    });
  }
  serviceProviders() {
    this.modelService.getServiceProviders().subscribe(data => {
      this.serviceProvider = data;
      console.log(data);
    });
  }
  selectServiceProvider(id) {
    this.modelDetails(id);
  }
  modelDetails(id) {
    this.serviceProviderId = id;
    this.modelService.getModelDetails(this.serviceProviderId).subscribe(data => {
      this.Detail = data;
     // console.log(data);
    });
  }

  allModels() {
    this.modelService.getAllModels().subscribe(data => {
      this.Detail = data;
      console.log(data.length);
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
    this.modelService.getNationalMenModels().subscribe(data => {
      this.Detail = data;
      if (data.length === 0) {
this.showMessage = true;
      } else if (data.length !== 0) {
        this.showMessage = false;
      }
    });
  }
  nationalWomenModels() {
    this.modelService.getNationalWomenModels().subscribe(data => {
      this.Detail = data;
      if (data.length === 0) {
this.showMessage = true;
      } else if (data.length  !== 0) {
        this.showMessage = false;
      }
    });
  }
  interNationalMenModels() {
    this.modelService.getInterNationalMenModels().subscribe(data => {
      this.Detail = data;
      if (data.length === 0) {
this.showMessage = true;
      } else if (data.length  !== 0) {
        this.showMessage = false;
      }
    });
  }
  interNationalWomenModels() {
    this.modelService.getInterNationalWomenModels().subscribe(data => {
      this.Detail = data;
      console.log(data.length);
      if (data.length === 0) {
this.showMessage = true;
      } else if (data.length !== 0) {
        this.showMessage = false;
      }
    });
  }


  bookModel(viewModelForm: FormGroup, modelId: any) {
    console.log(modelId);
    this.router.navigate(['/modelBooking', modelId]);
  }
}
