import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Model} from './model-detail.model';
import {ScheduledModelService} from '../scheduled-model.service';
import {DashBoardService} from '../../home/dashboard/dashboard.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-view-scheduled-model',
  templateUrl: './view-scheduled-model.component.html',
  styleUrls: ['./view-scheduled-model.component.css'],
})
export class ViewScheduledModelComponent implements OnInit {

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
  ];
  constructor(private fb: FormBuilder, private router: Router, private scheduledmodelService: ScheduledModelService,
     private dashBoardService: DashBoardService, private metaService: Meta) {

      }

  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.allModels();
    this.createForm();
    this.onSelect(this.services[0]);
    this.dashBoardService.generateTags({
      title: 'view',
      description: 'view Scheduled',
      image: 'https://rinteger.com/admin/images/SP_sprinteger_models/Akash Model/1.jpg',
    });
  }
  createForm() {
    this.viewModelForm = this.fb.group({
      id: ['']
    });
  }
  whatsappShare(imageShare) {
    this.imageUrl = 'https://rinteger.com/welcome';
    this.metaService.addTag( { property: 'og:image', content: 'https://rinteger.com/admin/images/SP_sprinteger_models/Farid/3.jpg' } );
    /*
    this.metaService.updateTag({ property: 'og:image', content: 'https://rinteger.com/admin/images/SP_sprinteger_models/Farid/3.jpg'  });
     */
    this.whatsappShareUrl = 'https://api.whatsapp.com/send?text=' + this.imageUrl;
    window.open(this.whatsappShareUrl);
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
