import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ModelManagementService } from '../model-management.service';
import { Model } from './model.model';
import { ServiceProviders } from './service-provider.model';


@Component({
  selector: 'app-view-model',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.css']
})
export class ViewModelComponent implements OnInit {
  viewModelForm: FormGroup;
  Detail: Model;
  selected = 'All';
  serviceProvider: ServiceProviders;
  serviceProviderId;
  constructor(private fb: FormBuilder, private router: Router, private modelService: ModelManagementService) { }
  ngOnInit() {
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
      console.log(data);
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
    });
  }
  nationalWomenModels() {
    this.modelService.getNationalWomenModels().subscribe(data => {
      this.Detail = data;
    });
  }
  interNationalMenModels() {
    this.modelService.getInterNationalMenModels().subscribe(data => {
      this.Detail = data;
    });
  }
  interNationalWomenModels() {
    this.modelService.getInterNationalWomenModels().subscribe(data => {
      this.Detail = data;
    });
  }


  bookModel(viewModelForm: FormGroup, modelId: any) {
    console.log(modelId);
    this.router.navigate(['/modelBooking', modelId]);
  }
}
