import { Component, OnInit, AfterViewInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Model} from '../view-scheduled-model/model-detail.model';
import {ScheduledModelService} from '../scheduled-model.service';
import {DashBoardService} from '../../home/dashboard/dashboard.service';
import { Title, Meta } from '@angular/platform-browser';
import { ProgressBarService } from '../../home/progress-bar/progress-bar.service';

@Component({
  selector: 'app-view-projection-model',
  templateUrl: './view-projection-model.component.html',
  styleUrls: ['./view-projection-model.component.css']
})
export class ViewProjectionModelComponent implements OnInit, AfterViewInit {

  viewModelForm: FormGroup;
  Detail: Model;
  showMessage: boolean;
  selected = 'All';
  selectedType;
  imageUrl;
  whatsappShareUrl;
  services = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Men International' },
    { id: 2, name: 'Women International' },
    { id: 3, name: 'Men National' },
    { id: 4, name: 'Women National' },
    { id: 5, name: 'Kids' },
  ];


  constructor( private fb: FormBuilder, private router: Router, private scheduledmodelService: ScheduledModelService,
    private dashBoardService: DashBoardService, private metaService: Meta, private progressBarService: ProgressBarService) { }

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
  ngAfterViewInit() {
    /* setTimeout(() => this.allModels()); */
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
      case 5: {
        this.kidsModel();
        break;
      }
  }
  this.selectedType = service;
}
  allModels() {
    this.scheduledmodelService.getProjectionModelDetails().subscribe(data => {
      this.Detail = data;
      if (data.length === 0) {
    this.showMessage = true;
      } else if (data.length !== 0) {
        this.showMessage = false;
      }
    });
  }
  kidsModel() {
    this.scheduledmodelService.getProjectionKidModel().subscribe(data => {
      this.Detail = data;
      if (data.length === 0) {
  this.showMessage = true;
      } else if (data.length !== 0) {
        this.showMessage = false;
      }
    });
  }
  nationalMenModels() {
    this.scheduledmodelService.getProjectionNationalMenModels().subscribe(data => {
      this.Detail = data;
      if (data.length === 0) {
this.showMessage = true;
      } else if (data.length !== 0) {
        this.showMessage = false;
      }
    });
  }
  nationalWomenModels() {
    this.scheduledmodelService.getProjectionNationalWomenModels().subscribe(data => {
      this.Detail = data;
      if (data.length === 0) {
this.showMessage = true;
      } else if (data.length !== 0) {
        this.showMessage = false;
      }
    });
  }
  interNationalMenModels() {
    this.scheduledmodelService.getProjectionInterNationalMenModels().subscribe(data => {
      this.Detail = data;
      if (data.length === 0) {
this.showMessage = true;
      } else if (data.length !== 0) {
        this.showMessage = false;
      }
    });
  }
  interNationalWomenModels() {
    this.scheduledmodelService.getProjectionInterNationalWomenModels().subscribe(data => {
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
