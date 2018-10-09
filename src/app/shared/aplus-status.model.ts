export class AplusCatalogingStatus {
    _id: Number;
    mobileNumber: Number;
    bookingOrderId: String;
    bookingDate: String;
    order: Boolean;
    materialPickedUp: Number;
    shootPlanning: Number;
    shootCompleted: Number;
    postProductionWork: Number;
    productDetailsReceived: Number;
    loginCredentialsReceived: Number;
    catalogContentMaking: Number;
    catalogUploaded: Number;
    qc_processing: Number;
    payment: Number;
    inventoryUpdation: Number;
    productLive: Number;
    materialReturn: Number;
    constructor(
        mobileNumber: Number,
        bookingDate: String,
        order: Boolean,
        materialPickedUp: Number,
        shootPlanning: Number,
        shootCompleted: Number,
        postProductionWork: Number,
        productDetailsReceived: Number,
        loginCredentialsReceived: Number,
        catalogContentMaking: Number,
        catalogUploaded: Number,
        payment: Number,
        qc_processing: Number,
        inventoryUpdation: Number,
        productLive: Number,
        materialReturn: Number
    ) {
        this.mobileNumber = mobileNumber;
        this.bookingDate = bookingDate;
        this.order = order;
        this.materialPickedUp = materialPickedUp;
        this.shootPlanning = shootPlanning;
        this.shootCompleted = shootCompleted;
        this.postProductionWork = postProductionWork;
        this.productDetailsReceived = productDetailsReceived;
        this.loginCredentialsReceived = loginCredentialsReceived;
        this.catalogContentMaking = catalogContentMaking;
        this.catalogUploaded =  catalogUploaded;
        this.payment = this.payment;
        this.qc_processing = qc_processing;
        this.inventoryUpdation = inventoryUpdation;
        this.productLive = productLive;
        this.materialReturn = materialReturn;
    }
}
