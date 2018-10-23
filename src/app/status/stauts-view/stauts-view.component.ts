import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StatusService } from '../status.service';
import { StatusView } from './status-view.model';
import { StatusDetail } from './status-detail.model';
import { BookingDetail } from './booking-detail.model';
import { element } from 'protractor';
import { DashBoardService } from '../../home/dashboard/dashboard.service';
import { EditingStatus } from '../../shared/editing-status.model';
import { CreativeStatus } from '../../shared/creative-status.model';
import { CatalogingStatus } from '../../shared/catalog-status.model';
import {RegistrationStatus} from '../../shared/registration-status.model';
import {AplusCatalogingStatus} from '../../shared/aplus-status.model';

@Component({
  selector: 'app-stauts-view',
  templateUrl: './stauts-view.component.html',
  styleUrls: ['./stauts-view.component.css']
})
export class StautsViewComponent implements OnInit {
  shootProgress: boolean;
  shootTrue: boolean;
  shoot: boolean;
  materialPickedUpTrue: boolean;
  materialPickedUpProgress: boolean;
  materialPickedUp: boolean;
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
  no: string;
  // statusDisplay: string;
  orders;
  StatusForOne: StatusDetail;
  RegistrationDetails: RegistrationStatus;
  AplusDetails: AplusCatalogingStatus;
  CreativeDetails: CreativeStatus;
  CatalogDetails: CatalogingStatus;
  EditingDetails: EditingStatus[] = [];
  Details: BookingDetail[] = [];
  Status: StatusView[] = [];
  statusViewForm: FormGroup;
  progress: boolean;
  completed: boolean;
  displayStatus: boolean;
  imageReceive: boolean;
  imageReceiveTrue: boolean;
  imageReceiveProgress: boolean;
  materialPicked: boolean;
  materialPickedTrue: boolean;
  materialPickedProgress: boolean;
  shootPlanning: boolean;
  shootPlanningTrue: boolean;
  shootPlanningProgress: boolean;
  shootCompleted: boolean;
  shootCompletedTrue: boolean;
  shootCompletedProgress: boolean;
  imageEditing: boolean;
  imageEditingTrue: boolean;
  imageEditingProgress: boolean;
  delivery: boolean;
  deliveryTrue: boolean;
  deliveryProgress: boolean;
  payment: boolean;
  paymentTrue: boolean;
  paymentProgress: boolean;
  materialReturn: boolean;
  materialReturnTrue: boolean;
  materialReturnProgress: boolean;
  postProduction: boolean;
  postProductionProgress: boolean;
  postProductionTrue: boolean;
  productDetail: boolean;
  productDetailTrue: boolean;
  productDetailProgress: boolean;
  loginCredential: boolean;
  loginCredentialProgress: boolean;
  loginCredentialTrue: boolean;
  catalogMaking: boolean;
  catalogMakingTrue: boolean;
  catalogMakingProgress: boolean;
  catalogUpload: boolean;
  catalogUploadTrue: boolean;
  catalogUploadProgress: boolean;
  qcProcess: boolean;
  qcProcessTrue: boolean;
  qcProcessProgress: boolean;
  inventoryUpdation: boolean;
  inventoryUpdationTrue: boolean;
  inventoryUpdationProgress: boolean;
  productOnLive: boolean;
  productOnLiveTrue: boolean;
  productOnLiveProgress: boolean;
  hideStatus: boolean;
  bookingStatusApproved: boolean;
  bookingStatusWaiting: boolean;
  bookingStatusCompleted: boolean;
  bookingCancelled: boolean;
  message: boolean;
  datacheck;
  cancelledStatus: boolean;
  activeStatus: boolean;
  editingStatusView: boolean;
  creativeStatusView: boolean;
  catalogStatusView: boolean;
  bookingStatus: boolean;
  registrationStatusView: boolean;
  aplusStatusView: boolean;
  filterOption = ['Model Booking', 'Direct Booking', 'Catalog Booking', 'Registration Booking', 'Editing Booking',
    'Marketing  Booking', 'Creative Booking', 'A+ Cataloging Booking', 'IT Services Booking', 'Digital Business Management Booking',
    'Scheduled Model Booking'];
  searchText: string;
  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private statusService: StatusService, private dashBoardService: DashBoardService) {
    this.no = this.activatedRoute.snapshot.paramMap.get('no');
  }

  ngOnInit() {
    this.dashBoardService.makeMenuTransparent();
    this.activeBooking(this.no);
    this.createForm();
    this.orderDisplay();
  }

  createForm() {
    this.statusViewForm = this.fb.group({
      order: [''],
      bookingType: [''],
      filterText: [],
      test: []
    });
  }
  showStatus() {
    this.hideStatus = false;
    this.displayStatus = false;
    this.message = false;
    this.editingStatusView = false;
    this.creativeStatusView = false;
    this.catalogStatusView = false;
    this.bookingStatus = false;
    this.registrationStatusView = false;
    this.aplusStatusView = false;
    this.activeBooking(this.no);
  }
  bookingType(value) {
    if (value === 'All') {
      this.searchText = 'Booking';
    } else {
      this.searchText = value;
    }
  }
  filterType(value) {
    console.log(this.datacheck);
  }
  statusView(statusViewForm: FormGroup, id: any, type: any) {
    if (type === 'Direct Booking' || type === 'Model Booking' || type === 'Scheduled Model Booking') {
      this.displayStatus = true;
      this.hideStatus = true;
      this.message = false;
      this.editingStatusView = false;
      this.creativeStatusView = false;
      this.catalogStatusView = false;
      this.bookingStatus = true;
      this.registrationStatusView = false;
      this.aplusStatusView = false;
      this.showBookingStatus(id);
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
    } else if (type === 'Marketing Booking') {
      this.message = true;
      this.displayStatus = false;
      this.hideStatus = true;
      this.editingStatusView = false;
      this.creativeStatusView = false;
      this.catalogStatusView = false;
      this.registrationStatusView = false;
      this.bookingStatus = true;
      this.aplusStatusView = false;
    } else if (type === 'Catalog Booking') {
      this.message = false;
      this.displayStatus = false;
      this.hideStatus = true;
      this.editingStatusView = false;
      this.creativeStatusView = false;
      this.catalogStatusView = true;
      this.registrationStatusView = false;
      this.bookingStatus = false;
      this.showCatalogStatus(id);
      this.aplusStatusView = false;
    } else if (type === 'Registration Booking') {
      this.message = false;
      this.displayStatus = false;
      this.hideStatus = true;
      this.editingStatusView = false;
      this.creativeStatusView = false;
      this.catalogStatusView = false;
      this.registrationStatusView = true;
      this.bookingStatus = false;
      this.aplusStatusView = false;
      this.showRegistrationStatus(id);
    } else if (type === 'A+ Cataloging Booking') {
      this.message = false;
      this.displayStatus = false;
      this.hideStatus = true;
      this.editingStatusView = false;
      this.creativeStatusView = false;
      this.catalogStatusView = false;
      this.registrationStatusView = false;
      this.bookingStatus = false;
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
    this.statusDetail(id, type);
  }
  orderDisplay() {

  }
  showBookingStatus(id) {
    this.statusService.getStatusById(this.no, id).subscribe(data => {
      this.StatusForOne = data;
      switch (data.materialPickedUp) {
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
      switch (data.shootCompleted) {
        case 0: {
          this.shootCompleted = true;
          this.shootCompletedTrue = false;
          this.shootCompletedProgress = false;
          break;
        }
        case 1: {
          this.shootCompleted = false;
          this.shootCompletedProgress = false;
          this.shootCompletedTrue = true;
          break;
        }
        case 2: {
          this.shootCompleted = false;
          this.shootCompletedProgress = true;
          this.shootCompletedTrue = false;
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
          this.materialReturnProgress = false;
          this.materialReturn = true;
          this.materialReturnTrue = false;
          break;
        }
        case 1: {
          this.materialReturnProgress = false;
          this.materialReturn = false;
          this.materialReturnTrue = true;
          break;
        }
        case 2: {
          this.materialReturnProgress = true;
          this.materialReturn = false;
          this.materialReturnTrue = false;
          break;
        }
      }
    },
      error => {
        console.log(error);
      }
    );
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
showAplusStatus(id) {
  this.statusService.aplusStatus(id).subscribe(data => {
    this.AplusDetails = data;
    console.log(data);
  switch (data[0].materialPickedUp) {
    case 0: {
      this.materialPickedUp = true;
      this.materialPickedUpTrue = false;
      this.materialPickedUpProgress = false;
      break;
    }
    case 1: {
      this.materialPickedUp = false;
      this.materialPickedUpTrue = true;
      this.materialPickedUpProgress = false;
      break;
    }
    case 2: {
      this.materialPickedUp = false;
      this.materialPickedUpTrue = false;
      this.materialPickedUpProgress = true;
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
      this.shoot = true;
      this.shootTrue = false;
      this.shootProgress = false;
      break;
    }
    case 1: {
      this.shootTrue = true;
      this.shoot = false;
      this.shootProgress = false;
      break;
    }
    case 2: {
      this.shootTrue = false;
      this.shoot = false;
      this.shootProgress = true;
      break;
    }
  }
  switch (data[0].postProductionWork) {
    case 0: {
      this.postProduction = true;
      this.postProductionTrue = false;
      this.postProductionProgress = false;
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
      this.loginCredentialTrue = true;
      this.loginCredential = false;
      this.loginCredentialProgress = false;
      break;
    }
    case 2: {
      this.loginCredentialTrue = false;
      this.loginCredential = false;
      this.loginCredentialProgress = true;
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
      this.catalogMakingTrue = true;
      this.catalogMakingProgress = false;
      break;
    }
    case 2: {
      this.catalogMaking = false;
      this.catalogMakingTrue = false;
      this.catalogMakingProgress = true;
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
  switch (data[0].productLive) {
    case 0: {
      this.productOnLive = true;
      this.productOnLiveTrue = false;
      this.productOnLiveProgress = false;
      break;
    }
    case 1: {
      this.productOnLive = false;
      this.productOnLiveTrue = true;
      this.productOnLiveProgress = false;
      break;
    }
    case 2: {
      this.productOnLive = false;
      this.productOnLiveTrue = false;
      this.productOnLiveProgress = true;
      break;
    }
  }
  switch (data[0].inventoryUpdation) {
    case 0: {
      this.inventoryUpdation = true;
      this.inventoryUpdationTrue = false;
      this.inventoryUpdationProgress = false;
      break;
    }
    case 1: {
      this.inventoryUpdation = false;
      this.inventoryUpdationTrue = true;
      this.inventoryUpdationProgress = false;
      break;
    }
    case 2: {
      this.inventoryUpdation = false;
      this.inventoryUpdationTrue = false;
      this.inventoryUpdationProgress = true;
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
      this.paymentProgress = false;
      this.paymentTrue = true;
      break;
    }
    case 2: {
      this.payment = false;
      this.paymentProgress = true;
      this.paymentTrue = false;
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
  status(no) {
    this.statusService.getStatusByNum(no).subscribe(statusData => {
      this.Details = statusData;
      console.log(this.Details);
    }, error => {
      console.log(error);
    });
  }
  statusDetail(num, type) {
    this.statusService.getBookingDetail(num, type).subscribe(statusData => {
      this.Details = statusData;
    }, error => {
      console.log(error);
    });
  }
  bookingStatusType(type, no) {
    if (type === 'cancelled') {
      this.cancelledBooking(no);
    }
  }
  activeBooking(no) {
    this.statusService.getActiveBookings(no).subscribe(statusData => {
      console.log(statusData);
      this.Details = statusData;
    }, error => {
      console.log(error);
    });
  }
  cancelledBooking(no) {
    this.cancelledStatus = true;
    this.statusService.getCancelledBookings(no).subscribe(statusData => {
      this.Details = statusData;
      console.log(this.Details);
    }, error => {
      console.log(error);
    });
  }
}
