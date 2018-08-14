import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import {ModelManagementService} from '../model-management.service';
import {Model} from './model.model';


@Component({
  selector: 'app-view-model',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.css']
})
export class ViewModelComponent implements OnInit {
  viewModelForm: FormGroup;
  Detail: Model;
  constructor(private fb: FormBuilder, private router: Router, private modelService: ModelManagementService)  { }
  ngOnInit() {
   this.modelDetails();
   this.createForm();
  }
/* serviceProviders() {
  this.modelService.getServiceProviders().subscribe(data => {
console.log(data);
  });
} */
createForm() {
  this.viewModelForm = this.fb.group({
    id: ['']
  });
}
menModels() {
  this.modelService.getMenDetails().subscribe(data => {
    this.Detail = data;
  });
}
womenModels() {
  this.modelService.getWomenDetails().subscribe(data => {
    this.Detail = data;
  });
}
nationalModels() {
  this.modelService.getNationalModels().subscribe(data => {
    this.Detail = data;
  });
}
interNationalModels() {
  this.modelService.getInterNationalModels().subscribe(data => {
    this.Detail = data;
  });
}
modelDetails() {
  this.modelService.getModelDetails().subscribe(data => {
    this.Detail = data;
  });
}
bookModel(viewModelForm: FormGroup, modelId: any) {
console.log(modelId);
this.router.navigate(['/modelBooking', modelId]);
}
}
