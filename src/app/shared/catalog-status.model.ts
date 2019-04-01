export class CatalogingStatus {
    _id: Number;
    mobileNumber: Number;
    bookingOrderId: String;
    bookingDate: String;
    order: Boolean;
    imageReceived: Number;
    productDetailsReceived: Number;
    loginCredentialsReceived: Number;
    catalogContentMaking: Number;
    catalogUploaded: Number;
    qc_processing: Number;
    payment: Number;
    inventoryUpdation: Number;
    productLive: Number;
    constructor(
        mobileNumber: Number,
        bookingDate: String,
        order: Boolean,
        imageReceived: Number,
        productDetailsReceived: Number,
        loginCredentialsReceived: Number,
        catalogContentMaking: Number,
        catalogUploaded: Number,
        payment: Number,
        qc_processing: Number,
        inventoryUpdation: Number,
        productLive: Number
    ) {
        this.mobileNumber = mobileNumber;
        this.bookingDate = bookingDate;
        this.order = order;
        this.imageReceived = imageReceived;
        this.productDetailsReceived = productDetailsReceived;
        this.loginCredentialsReceived = loginCredentialsReceived;
        this.catalogContentMaking = catalogContentMaking;
        this.catalogUploaded =  catalogUploaded;
        this.payment = this.payment;
        this.qc_processing = qc_processing;
        this.inventoryUpdation = inventoryUpdation;
        this.productLive = productLive;
    }
}
