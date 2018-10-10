import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import { StatusService } from '../status.service';
import { StatusDetails } from './status.model';
import { BookingDetails } from './booking-detail.model';
import { mobileNumber } from './validation';
import { DashBoardService } from '../../home/dashboard/dashboard.service';
import { EditingStatus } from '../../shared/editing-status.model';
import { CreativeStatus } from '../../shared/creative-status.model';
import { CatalogingStatus } from '../../shared/catalog-status.model';
import {RegistrationStatus} from '../../shared/registration-status.model';
import {AplusCatalogingStatus} from '../../shared/aplus-status.model';

@Component({
  selector: 'app-new-user-status',
  templateUrl: './new-user-status.component.html',
  styleUrls: ['./new-user-status.component.css']
})
export class NewUserStatusComponent implements OnInit {
  AplusDetails: AplusCatalogingStatus;
  RegistrationDetails: RegistrationStatus;
  CreativeDetails: CreativeStatus;
  CatalogDetails: CatalogingStatus;
  EditingDetails: EditingStatus[] = [];
  shootPlanningTrue: boolean;
  shootPlanningProgress: boolean;
  shootPlanning: boolean;
  postProductionProgress: boolean;
  postProductionTrue: boolean;
  postProduction: boolean;
  imageReceive: boolean;
  imageReceiveProgress: boolean;
  imageReceiveTrue: boolean;
  productDetailTrue: boolean;
  productDetailProgress: boolean;
  productDetail: boolean;
  loginCredentialTrue: boolean;
  loginCredentialProgress: boolean;
  loginCredential: boolean;
  catalogMaking: boolean;
  catalogMakingProgress: boolean;
  catalogMakingTrue: boolean;
  catalogUpload: boolean;
  catalogUploadProgress: boolean;
  catalogUploadTrue: boolean;
  qcProcess: boolean;
  qcProcessProgress: boolean;
  qcProcessTrue: boolean;
  inventoryUpdationTrue: boolean;
  inventoryUpdationProgress: boolean;
  inventoryUpdation: boolean;
  productOnLiveTrue: boolean;
  productOnLiveProgress: boolean;
  productOnLive: boolean;
  bookingStatus: boolean;
  catalogStatusView: boolean;
  creativeStatusView: boolean;
  editingStatusView: boolean;
  newUserForm: FormGroup;
  status: StatusDetails;
  show: Boolean;
  mobileNo;
  StatusForOne;
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
  materialPickedProgress: boolean;
  shootCompletedProgress: boolean;
  imageEditingProgress: boolean;
  deliveryProgress: boolean;
  paymentProgress: boolean;
  materialReturnProgress: boolean;
  hideStatus: boolean;
  Detail: BookingDetails[] = [];
  message: boolean;
  searchText: string;
  editingStatus: boolean;
  detailsProgress: boolean;
  detailsTrue: boolean;
  details: boolean;
  activationProgress: boolean;
  activationTrue: boolean;
  activation: boolean;
  verificationProgress: boolean;
  verificationTrue: boolean;
  verification: boolean;
  brandRegProgress: boolean;
  brandRegTrue: boolean;
  brandReg: boolean;
  accountCreationsProgress: boolean;
  accountCreationsTrue: boolean;
  accountCreations: boolean;
  documentsReqProgress: boolean;
  documentsReqTrue: boolean;
  documentsReq: boolean;
  registrationStatusView: boolean;
  aplusStatusView: boolean;
  filterOption = ['Model Booking', 'Direct Booking', 'Catalog Booking', 'Registration Booking', 'Editing Booking',
    'Marketing  Booking', 'Creative Booking', 'A+ Cataloging Booking', 'IT Services Booking', 'Digital Business Management Booking'];
  constructor(private fb: FormBuilder, private router: Router,
    private statusService: StatusService, private localStorageService: LocalStorageService, private dashboardservice: DashBoardService) { }

  ngOnInit() {
    this.dashboardservice.makeMenuTransparent();
    this.createForm();
  }
  createForm() {
    this.newUserForm = this.fb.group({
      mobileNumber: ['', mobileNumber],
      name: ['', Validators.required],
      order: [],
      bookingType: [],
      searchText: ['']
    });
  }
  bookingType(value) {
    if (value === 'All') {
      this.searchText = 'Booking';
    } else {
      this.searchText = value;
    }
  }
  findStatus(newUserForm: FormGroup, mobileNum: any) {
    this.localStorageService.store('mobileno', mobileNum);
    this.statusService.getActiveBookings(mobileNum).subscribe(data => {
      this.status = data;
      this.show = true;
      console.log(data);
    },
      error => {
        console.log(error);
      }
    );
  }
  showStatus() {
    this.hideStatus = false;
    this.displayStatus = false;
    this.editingStatusView = false;
    this.bookingStatus = false;
    this.creativeStatusView = false;
    this.catalogStatusView = false;
    this.registrationStatusView = false;
    this.aplusStatusView = false;
    this.message = false;
  }
  statusView(statusViewForm: FormGroup, id: any, type: any) {
    if (type === 'Direct Booking' || type === 'Model Booking') {
      this.displayStatus = true;
      this.hideStatus = true;
      this.message = false;
      this.editingStatusView = false;
      this.creativeStatusView = false;
      this.catalogStatusView = false;
      this.bookingStatus = true;
      this.registrationStatusView = false;
      this.aplusStatusView = false;
    } else if (type === 'Editing Booking') {
      this.message = false;
      this.displayStatus = false;
      this.hideStatus = true;
      this.editingStatusView = true;
      this.creativeStatusView = false;
      this.catalogStatusView = false;
      this.bookingStatus = true;
      this.registrationStatusView = false;
      this.aplusStatusView = false;
      this.showEditingStatus(id);
    } else if (type === 'Creative Booking') {
      this.message = false;
      this.displayStatus = false;
      this.hideStatus = true;
      this.editingStatusView = false;
      this.creativeStatusView = true;
      this.catalogStatusView = false;
      this.bookingStatus = false;
      this.registrationStatusView = false;
      this.aplusStatusView = false;
      this.showCreativeStatus(id);
    } else if (type === 'Catalog Booking') {
      this.message = false;
      this.displayStatus = false;
      this.hideStatus = true;
      this.editingStatusView = false;
      this.creativeStatusView = false;
      this.catalogStatusView = true;
      this.bookingStatus = false;
      this.registrationStatusView = false;
      this.aplusStatusView = false;
      this.showCatalogStatus(id);
    } else if (type === 'Marketing Booking') {
      this.message = true;
      this.displayStatus = false;
      this.hideStatus = false;
      this.editingStatusView = false;
      this.creativeStatusView = false;
      this.catalogStatusView = false;
      this.registrationStatusView = false;
      this.aplusStatusView = false;
    } else if (type === 'Registration Booking') {
      this.message = false;
      this.displayStatus = false;
      this.hideStatus = true;
      this.editingStatusView = false;
      this.creativeStatusView = false;
      this.catalogStatusView = false;
      this.bookingStatus = false;
      this.registrationStatusView = true;
      this.aplusStatusView = false;
      this.showRegistrationStatus(id);
    } else if (type === 'A+ Cataloging Booking') {
      this.message = false;
      this.displayStatus = false;
      this.hideStatus = true;
      this.editingStatusView = false;
      this.creativeStatusView = false;
      this.catalogStatusView = false;
      this.bookingStatus = false;
      this.registrationStatusView = false;
      this.aplusStatusView = true;
      this.showAplusStatus(id);
    } else if (type === 'IT Services Booking') {
      this.message = true;
      this.displayStatus = false;
      this.hideStatus = true;
      this.editingStatusView = false;
      this.creativeStatusView = false;
      this.catalogStatusView = false;
      this.bookingStatus = false;
      this.registrationStatusView = false;
      this.aplusStatusView = false;
    } else if (type === 'Digital Business Management Booking') {
      this.message = true;
      this.displayStatus = false;
      this.hideStatus = true;
      this.editingStatusView = false;
      this.creativeStatusView = false;
      this.catalogStatusView = false;
      this.bookingStatus = false;
      this.registrationStatusView = false;
      this.aplusStatusView = false;
    }
    this.mobileNo = this.localStorageService.retrieve('mobileno');
    this.statusService.getStatusById(this.mobileNo, id).subscribe(data => {
      this.Detail = data;
      switch (data.order) {
        case 0: {
          this.progress = true;
          break;
        }
        case 1: {
          this.completed = true;
          break;
        }
      }
      switch (data.materialPickedUp) {
        case 0: {
          this.materialPicked = true;
          this.materialPickedTrue = false;
          this.materialPickedProgress = false;
          break;
        }
        case 1: {
          this.materialPicked = false;
          this.materialPickedTrue = true;
          this.materialPickedProgress = false;
          break;
        }
        case 2: {
          this.materialPicked = false;
          this.materialPickedTrue = false;
          this.materialPickedProgress = true;
          break;
        }
      }
      switch (data.shootCompleted) {
        case 0: {
          this.shootCompleted = true;
          this.shootCompletedProgress = false;
          this.shootCompletedTrue = false;
          break;
        }
        case 1: {
          this.shootCompleted = false;
          this.shootCompletedTrue = true;
          this.shootCompletedProgress = false;
          break;
        }
        case 2: {
          this.shootCompleted = false;
          this.shootCompletedTrue = false;
          this.shootCompletedProgress = true;
          break;
        }
      }
      switch (data.imageEditing) {
        case 0: {
          this.imageEditing = true;
          this.imageEditingTrue = false;
          this.imageEditingProgress = false;
          break;
        }
        case 1: {
          this.imageEditing = false;
          this.imageEditingTrue = true;
          this.imageEditingProgress = false;
          break;
        }
        case 2: {
          this.imageEditing = false;
          this.imageEditingTrue = false;
          this.imageEditingProgress = true;
          break;
        }
      }
      switch (data.delivery) {
        case 0: {
          this.delivery = true;
          this.deliveryTrue = false;
          this.deliveryProgress = false;
          break;
        }
        case 1: {
          this.deliveryTrue = true;
          this.delivery = false;
          this.deliveryProgress = false;
          break;
        }
        case 2: {
          this.deliveryTrue = false;
          this.delivery = false;
          this.deliveryProgress = true;
          break;
        }
      }
      switch (data.payment) {
        case 0: {
          this.payment = true;
          this.paymentTrue = false;
          this.paymentProgress = false;
          break;
        }
        case 1: {
          this.payment = false;
          this.paymentTrue = true;
          this.paymentProgress = false;
          break;
        }
        case 2: {
          this.payment = false;
          this.paymentTrue = false;
          this.paymentProgress = true;
          break;
        }
      }
      switch (data.materialReturn) {
        case 0: {
          this.materialReturn = true;
          this.materialReturnProgress = false;
          this.materialReturnTrue = false;
          break;
        }
        case 1: {
          this.materialReturn = false;
          this.materialReturnProgress = false;
          this.materialReturnTrue = true;
          break;
        }
        case 2: {
          this.materialReturn = false;
          this.materialReturnProgress = true;
          this.materialReturnTrue = false;
          break;
        }
      }
    },
      error => {
        console.log(error);
      }
    );
    this.bookingDetail(id, type);
  }
  showAplusStatus(id) {
    this.statusService.aplusStatus(id).subscribe(data => {
      this.AplusDetails = data;
      console.log(data);
      switch (data[0].materialPickedUp) {
        case 0: {
          this.materialPicked = true;
          this.materialPickedTrue = false;
          this.materialPickedProgress = false;
          break;
        }
        case 1: {
          this.materialPicked = false;
          this.materialPickedProgress = false;
          this.materialPickedTrue = true;
          break;
        }
        case 2: {
          this.materialPicked = false;
          this.materialPickedProgress = true;
          this.materialPickedTrue = false;
          break;
        }
      }
      switch (data[0].shootPlanning) {
        case 0: {
          this.shootPlanning = true;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = false;
          break;
        }
        case 1: {
          this.shootPlanning = false;
          this.shootPlanningProgress = false;
          this.shootPlanningTrue = true;
          break;
        }
        case 2: {
          this.shootPlanning = false;
          this.shootPlanningProgress = true;
          this.shootPlanningTrue = false;
          break;
        }
      }
      switch (data[0].shootCompleted) {
        case 0: {
          this.shootCompleted = true;
          this.shootCompletedTrue = false;
          this.shootCompletedProgress = false;
          break;
        }
        case 1: {
          this.shootCompleted = false;
          this.shootCompletedTrue = true;
          this.shootCompletedProgress = false;
          break;
        }
        case 2: {
          this.shootCompleted = false;
          this.shootCompletedTrue = false;
          this.shootCompletedProgress = true;
          break;
        }
      }
      switch (data[0].postProductionWork) {
        case 0: {
          this.postProduction = true;
          this.postProductionProgress = false;
          this.postProductionTrue = false;
          break;
        }
        case 1: {
          this.postProduction = false;
          this.postProductionTrue = true;
          this.postProductionProgress = false;
          break;
        }
        case 2: {
          this.postProduction = false;
          this.postProductionTrue = false;
          this.postProductionProgress = true;
          break;
        }
      }
      switch (data[0].productDetailsReceived) {
        case 0: {
          this.productDetail = true;
          this.productDetailTrue = false;
          this.productDetailProgress = false;
          break;
        }
        case 1: {
          this.productDetail = false;
          this.productDetailProgress = false;
          this.productDetailTrue = true;
          break;
        }
        case 2: {
          this.productDetail = false;
          this.productDetailProgress = true;
          this.productDetailTrue = false;
          break;
        }
      }
      switch (data[0].loginCredentialsReceived) {
        case 0: {
          this.loginCredential = true;
          this.loginCredentialTrue = false;
          this.loginCredentialProgress = false;
          break;
        }
        case 1: {
          this.loginCredential = false;
          this.loginCredentialProgress = false;
          this.loginCredentialTrue = true;
          break;
        }
        case 2: {
          this.loginCredential = false;
          this.loginCredentialProgress = true;
          this.loginCredentialTrue = false;
          break;
        }
      }
      switch (data[0].catalogContentMaking) {
        case 0: {
          this.catalogMaking = true;
          this.catalogMakingTrue = false;
          this.catalogMakingProgress = false;
          break;
        }
        case 1: {
          this.catalogMaking = false;
          this.catalogMakingProgress = false;
          this.catalogMakingTrue = true;
          break;
        }
        case 2: {
          this.catalogMaking = false;
          this.catalogMakingProgress = true;
          this.catalogMakingTrue = false;
          break;
        }
      }
      switch (data[0].catalogUploaded) {
        case 0: {
          this.catalogUpload = true;
          this.catalogUploadTrue = false;
          this.catalogUploadProgress = false;
          break;
        }
        case 1: {
          this.catalogUpload = false;
          this.catalogUploadProgress = false;
          this.catalogUploadTrue = true;
          break;
        }
        case 2: {
          this.catalogUpload = false;
          this.catalogUploadProgress = true;
          this.catalogUploadTrue = false;
          break;
        }
      }
      switch (data[0].qc_processing) {
        case 0: {
          this.qcProcess = true;
          this.qcProcessTrue = false;
          this.qcProcessProgress = false;
          break;
        }
        case 1: {
          this.qcProcess = false;
          this.qcProcessProgress = false;
          this.qcProcessTrue = true;
          break;
        }
        case 2: {
          this.qcProcess = false;
          this.qcProcessProgress = true;
          this.qcProcessTrue = false;
          break;
        }
      }
      switch (data[0].inventoryUpdation) {
        case 0: {
          this.inventoryUpdation = true;
          this.inventoryUpdationProgress = false;
          this.inventoryUpdationTrue = false;
          break;
        }
        case 1: {
          this.inventoryUpdation = false;
          this.inventoryUpdationProgress = false;
          this.inventoryUpdationTrue = true;
          break;
        }
        case 2: {
          this.inventoryUpdation = false;
          this.inventoryUpdationProgress = true;
          this.inventoryUpdationTrue = false;
          break;
        }
      }
      switch (data[0].productLive) {
        case 0: {
          this.productOnLive = true;
          this.productOnLiveProgress = false;
          this.productOnLiveTrue = false;
          break;
        }
        case 1: {
          this.productOnLive = false;
          this.productOnLiveProgress = false;
          this.productOnLiveTrue = true;
          break;
        }
        case 2: {
          this.productOnLive = false;
          this.productOnLiveProgress = true;
          this.productOnLiveTrue = false;
          break;
        }
      }
      switch (data[0].payment) {
        case 0: {
          this.payment = true;
          this.paymentTrue = false;
          this.paymentProgress = false;
          break;
        }
        case 1: {
          this.payment = false;
          this.paymentTrue = true;
          this.paymentProgress = false;
          break;
        }
        case 2: {
          this.payment = false;
          this.paymentTrue = false;
          this.paymentProgress = true;
          break;
        }
      }
      switch (data[0].materialReturn) {
        case 0: {
          this.materialReturn = true;
          this.materialReturnTrue = false;
          this.materialReturnProgress = false;
          break;
        }
        case 1: {
          this.materialReturn = false;
          this.materialReturnTrue = true;
          this.materialReturnProgress = false;
          break;
        }
        case 2: {
          this.materialReturn = false;
          this.materialReturnTrue = false;
          this.materialReturnProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
   }
  showEditingStatus(id) {
    this.statusService.editingStatus(id).subscribe(data => {
      this.EditingDetails = data;
      switch (data[0].imageReceived) {
        case 0: {
          this.imageReceive = true;
          this.imageReceiveTrue = false;
          this.imageReceiveProgress = false;
          break;
        }
        case 1: {
          this.imageReceive = false;
          this.imageReceiveProgress = false;
          this.imageReceiveTrue = true;
          break;
        }
        case 2: {
          this.imageReceive = false;
          this.imageReceiveProgress = true;
          this.imageReceiveTrue = false;
          break;
        }
      }
      switch (data[0].editing) {
        case 0: {
          this.imageEditing = true;
          this.imageEditingTrue = false;
          this.imageEditingProgress = false;
          break;
        }
        case 1: {
          this.imageEditing = false;
          this.imageEditingProgress = false;
          this.imageEditingTrue = true;
          break;
        }
        case 2: {
          this.imageEditing = false;
          this.imageEditingProgress = true;
          this.imageEditingTrue = false;
          break;
        }
      }
      switch (data[0].imageDelivery) {
        case 0: {
          this.delivery = true;
          this.deliveryTrue = false;
          this.deliveryProgress = false;
          break;
        }
        case 1: {
          this.deliveryTrue = true;
          this.delivery = false;
          this.deliveryProgress = false;
          break;
        }
        case 2: {
          this.deliveryTrue = false;
          this.delivery = false;
          this.deliveryProgress = true;
          break;
        }
      }
      switch (data[0].payment) {
        case 0: {
          this.payment = true;
          this.paymentTrue = false;
          this.paymentProgress = false;
          break;
        }
        case 1: {
          this.payment = false;
          this.paymentTrue = true;
          this.paymentProgress = false;
          break;
        }
        case 2: {
          this.payment = false;
          this.paymentTrue = false;
          this.paymentProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  showCreativeStatus(id) {
    this.statusService.creativeStatus(id).subscribe(data => {
      this.CreativeDetails = data;
      switch (data[0].materialPickedUp) {
        case 0: {
          this.materialPicked = true;
          this.materialPickedTrue = false;
          this.materialPickedProgress = false;
          break;
        }
        case 1: {
          this.materialPicked = false;
          this.materialPickedProgress = false;
          this.materialPickedTrue = true;
          break;
        }
        case 2: {
          this.materialPicked = false;
          this.materialPickedProgress = true;
          this.materialPickedTrue = false;
          break;
        }
      }
      switch (data[0].shootPlanning) {
        case 0: {
          this.shootPlanning = true;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = false;
          break;
        }
        case 1: {
          this.shootPlanning = false;
          this.shootPlanningProgress = false;
          this.shootPlanningTrue = true;
          break;
        }
        case 2: {
          this.shootPlanning = false;
          this.shootPlanningProgress = true;
          this.shootPlanningTrue = false;
          break;
        }
      }
      switch (data[0].shootCompleted) {
        case 0: {
          this.shootCompleted = true;
          this.shootCompletedTrue = false;
          this.shootCompletedProgress = false;
          break;
        }
        case 1: {
          this.shootCompleted = false;
          this.shootCompletedTrue = true;
          this.shootCompletedProgress = false;
          break;
        }
        case 2: {
          this.shootCompleted = false;
          this.shootCompletedTrue = false;
          this.shootCompletedProgress = true;
          break;
        }
      }
      switch (data[0].postProductionWork) {
        case 0: {
          this.postProduction = true;
          this.postProductionProgress = false;
          this.postProductionTrue = false;
          break;
        }
        case 1: {
          this.postProduction = false;
          this.postProductionTrue = true;
          this.postProductionProgress = false;
          break;
        }
        case 2: {
          this.postProduction = false;
          this.postProductionTrue = false;
          this.postProductionProgress = true;
          break;
        }
      }
      switch (data[0].productDetailsReceived) {
        case 0: {
          this.productDetail = true;
          this.productDetailTrue = false;
          this.productDetailProgress = false;
          break;
        }
        case 1: {
          this.productDetail = false;
          this.productDetailProgress = false;
          this.productDetailTrue = true;
          break;
        }
        case 2: {
          this.productDetail = false;
          this.productDetailProgress = true;
          this.productDetailTrue = false;
          break;
        }
      }
      switch (data[0].loginCredentialsReceived) {
        case 0: {
          this.loginCredential = true;
          this.loginCredentialTrue = false;
          this.loginCredentialProgress = false;
          break;
        }
        case 1: {
          this.loginCredential = false;
          this.loginCredentialProgress = false;
          this.loginCredentialTrue = true;
          break;
        }
        case 2: {
          this.loginCredential = false;
          this.loginCredentialProgress = true;
          this.loginCredentialTrue = false;
          break;
        }
      }
      switch (data[0].catalogContentMaking) {
        case 0: {
          this.catalogMaking = true;
          this.catalogMakingTrue = false;
          this.catalogMakingProgress = false;
          break;
        }
        case 1: {
          this.catalogMaking = false;
          this.catalogMakingProgress = false;
          this.catalogMakingTrue = true;
          break;
        }
        case 2: {
          this.catalogMaking = false;
          this.catalogMakingProgress = true;
          this.catalogMakingTrue = false;
          break;
        }
      }
      switch (data[0].catalogUploaded) {
        case 0: {
          this.catalogUpload = true;
          this.catalogUploadTrue = false;
          this.catalogUploadProgress = false;
          break;
        }
        case 1: {
          this.catalogUpload = false;
          this.catalogUploadProgress = false;
          this.catalogUploadTrue = true;
          break;
        }
        case 2: {
          this.catalogUpload = false;
          this.catalogUploadProgress = true;
          this.catalogUploadTrue = false;
          break;
        }
      }
      switch (data[0].qc_processing) {
        case 0: {
          this.qcProcess = true;
          this.qcProcessTrue = false;
          this.qcProcessProgress = false;
          break;
        }
        case 1: {
          this.qcProcess = false;
          this.qcProcessProgress = false;
          this.qcProcessTrue = true;
          break;
        }
        case 2: {
          this.qcProcess = false;
          this.qcProcessProgress = true;
          this.qcProcessTrue = false;
          break;
        }
      }
      switch (data[0].inventoryUpdation) {
        case 0: {
          this.inventoryUpdation = true;
          this.inventoryUpdationProgress = false;
          this.inventoryUpdationTrue = false;
          break;
        }
        case 1: {
          this.inventoryUpdation = false;
          this.inventoryUpdationProgress = false;
          this.inventoryUpdationTrue = true;
          break;
        }
        case 2: {
          this.inventoryUpdation = false;
          this.inventoryUpdationProgress = true;
          this.inventoryUpdationTrue = false;
          break;
        }
      }
      switch (data[0].productLive) {
        case 0: {
          this.productOnLive = true;
          this.productOnLiveProgress = false;
          this.productOnLiveTrue = false;
          break;
        }
        case 1: {
          this.productOnLive = false;
          this.productOnLiveProgress = false;
          this.productOnLiveTrue = true;
          break;
        }
        case 2: {
          this.productOnLive = false;
          this.productOnLiveProgress = true;
          this.productOnLiveTrue = false;
          break;
        }
      }
      switch (data[0].payment) {
        case 0: {
          this.payment = true;
          this.paymentTrue = false;
          this.paymentProgress = false;
          break;
        }
        case 1: {
          this.payment = false;
          this.paymentTrue = true;
          this.paymentProgress = false;
          break;
        }
        case 2: {
          this.payment = false;
          this.paymentTrue = false;
          this.paymentProgress = true;
          break;
        }
      }
      switch (data[0].materialReturn) {
        case 0: {
          this.materialReturn = true;
          this.materialReturnTrue = false;
          this.materialReturnProgress = false;
          break;
        }
        case 1: {
          this.materialReturn = false;
          this.materialReturnTrue = true;
          this.materialReturnProgress = false;
          break;
        }
        case 2: {
          this.materialReturn = false;
          this.materialReturnTrue = false;
          this.materialReturnProgress = true;
          break;
        }
      }
      console.log(this.CreativeDetails);
    }, error => {
      console.log(error);
    });
  }
  showCatalogStatus(id) {
    this.statusService.catalogStatus(id).subscribe(data => {
      this.CatalogDetails = data;
      console.log(this.CatalogDetails);
      switch (data[0].imageReceived) {
        case 0: {
          this.imageReceive = true;
          this.imageReceiveTrue = false;
          this.imageReceiveProgress = false;
          break;
        }
        case 1: {
          this.imageReceive = false;
          this.imageReceiveProgress = false;
          this.imageReceiveTrue = true;
          break;
        }
        case 2: {
          this.imageReceive = false;
          this.imageReceiveProgress = true;
          this.imageReceiveTrue = false;
          break;
        }
      }
      switch (data[0].productDetailsReceived) {
        case 0: {
          this.productDetail = true;
          this.productDetailTrue = false;
          this.productDetailProgress = false;
          break;
        }
        case 1: {
          this.productDetail = false;
          this.productDetailProgress = false;
          this.productDetailTrue = true;
          break;
        }
        case 2: {
          this.productDetail = false;
          this.productDetailProgress = true;
          this.productDetailTrue = false;
          break;
        }
      }
      switch (data[0].loginCredentialsReceived) {
        case 0: {
          this.loginCredential = true;
          this.loginCredentialTrue = false;
          this.loginCredentialProgress = false;
          break;
        }
        case 1: {
          this.loginCredential = false;
          this.loginCredentialProgress = false;
          this.loginCredentialTrue = true;
          break;
        }
        case 2: {
          this.loginCredential = false;
          this.loginCredentialProgress = true;
          this.loginCredentialTrue = false;
          break;
        }
      }
      switch (data[0].catalogContentMaking) {
        case 0: {
          this.catalogMaking = true;
          this.catalogMakingTrue = false;
          this.catalogMakingProgress = false;
          break;
        }
        case 1: {
          this.catalogMaking = false;
          this.catalogMakingProgress = false;
          this.catalogMakingTrue = true;
          break;
        }
        case 2: {
          this.catalogMaking = false;
          this.catalogMakingProgress = true;
          this.catalogMakingTrue = false;
          break;
        }
      }
      switch (data[0].catalogUploaded) {
        case 0: {
          this.catalogUpload = true;
          this.catalogUploadTrue = false;
          this.catalogUploadProgress = false;
          break;
        }
        case 1: {
          this.catalogUpload = false;
          this.catalogUploadProgress = false;
          this.catalogUploadTrue = true;
          break;
        }
        case 2: {
          this.catalogUpload = false;
          this.catalogUploadProgress = true;
          this.catalogUploadTrue = false;
          break;
        }
      }
      switch (data[0].qc_processing) {
        case 0: {
          this.qcProcess = true;
          this.qcProcessTrue = false;
          this.qcProcessProgress = false;
          break;
        }
        case 1: {
          this.qcProcess = false;
          this.qcProcessProgress = false;
          this.qcProcessTrue = true;
          break;
        }
        case 2: {
          this.qcProcess = false;
          this.qcProcessProgress = true;
          this.qcProcessTrue = false;
          break;
        }
      }
      switch (data[0].inventoryUpdation) {
        case 0: {
          this.inventoryUpdation = true;
          this.inventoryUpdationProgress = false;
          this.inventoryUpdationTrue = false;
          break;
        }
        case 1: {
          this.inventoryUpdation = false;
          this.inventoryUpdationProgress = false;
          this.inventoryUpdationTrue = true;
          break;
        }
        case 2: {
          this.inventoryUpdation = false;
          this.inventoryUpdationProgress = true;
          this.inventoryUpdationTrue = false;
          break;
        }
      }
      switch (data[0].productLive) {
        case 0: {
          this.productOnLive = true;
          this.productOnLiveProgress = false;
          this.productOnLiveTrue = false;
          break;
        }
        case 1: {
          this.productOnLive = false;
          this.productOnLiveProgress = false;
          this.productOnLiveTrue = true;
          break;
        }
        case 2: {
          this.productOnLive = false;
          this.productOnLiveProgress = true;
          this.productOnLiveTrue = false;
          break;
        }
      }
      switch (data[0].payment) {
        case 0: {
          this.payment = true;
          this.paymentTrue = false;
          this.paymentProgress = false;
          break;
        }
        case 1: {
          this.payment = false;
          this.paymentTrue = true;
          this.paymentProgress = false;
          break;
        }
        case 2: {
          this.payment = false;
          this.paymentTrue = false;
          this.paymentProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  showRegistrationStatus(id) {
    this.statusService.registrationStatus(id).subscribe(data => {
      this.RegistrationDetails = data;
      console.log(this.RegistrationDetails);
      switch (data[0].documentsRequired) {
        case 0: {
          this.documentsReq = true;
          this.documentsReqTrue = false;
          this.documentsReqProgress = false;
          break;
        }
        case 1: {
          this.documentsReq = false;
          this.documentsReqTrue = true;
          this.documentsReqProgress = false;
          break;
        }
        case 2: {
          this.documentsReq = false;
          this.documentsReqTrue = false;
          this.documentsReqProgress = true;
          break;
        }
      }
      switch (data[0].accountCreation) {
        case 0: {
          this.accountCreations = true;
          this.accountCreationsTrue = false;
          this.accountCreationsProgress = false;
          break;
        }
        case 1: {
          this.accountCreations = false;
          this.accountCreationsProgress = false;
          this.accountCreationsTrue = true;
          break;
        }
        case 2: {
          this.accountCreations = false;
          this.accountCreationsProgress = true;
          this.accountCreationsTrue = false;
          break;
        }
      }
      switch (data[0].brandRegistration) {
        case 0: {
          this.brandReg = true;
          this.brandRegTrue = false;
          this.brandRegProgress = false;
          break;
        }
        case 1: {
          this.brandRegTrue = true;
          this.brandReg = false;
          this.brandRegProgress = false;
          break;
        }
        case 2: {
          this.brandRegTrue = false;
          this.brandReg = false;
          this.brandRegProgress = true;
          break;
        }
      }
      switch (data[0].account_brandVerification) {
        case 0: {
          this.verification = true;
          this.verificationTrue = false;
          this.verificationProgress = false;
          break;
        }
        case 1: {
          this.verificationTrue = true;
          this.verification = false;
          this.verificationProgress = false;
          break;
        }
        case 2: {
          this.verificationTrue = false;
          this.verification = false;
          this.verificationProgress = true;
          break;
        }
      }
      switch (data[0].accountActivation) {
        case 0: {
          this.activation = true;
          this.activationTrue = false;
          this.activationProgress = false;
          break;
        }
        case 1: {
          this.activationTrue = true;
          this.activation = false;
          this.activationProgress = false;
          break;
        }
        case 2: {
          this.activationTrue = false;
          this.activation = false;
          this.activationProgress = true;
          break;
        }
      }
      switch (data[0].detailsForwarding) {
        case 0: {
          this.details = true;
          this.detailsTrue = false;
          this.detailsProgress = false;
          break;
        }
        case 1: {
          this.detailsTrue = true;
          this.details = false;
          this.detailsProgress = false;
          break;
        }
        case 2: {
          this.detailsTrue = false;
          this.details = false;
          this.detailsProgress = true;
          break;
        }
      }
      switch (data[0].payment) {
        case 0: {
          this.payment = true;
          this.paymentTrue = false;
          this.paymentProgress = false;
          break;
        }
        case 1: {
          this.payment = false;
          this.paymentTrue = true;
          this.paymentProgress = false;
          break;
        }
        case 2: {
          this.payment = false;
          this.paymentTrue = false;
          this.paymentProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  bookingDetail(num, type) {
    this.statusService.getBookingDetail(num, type).subscribe(statusData => {
      this.Detail = statusData;
    }, error => {
      console.log(error);
    });
  }
}
