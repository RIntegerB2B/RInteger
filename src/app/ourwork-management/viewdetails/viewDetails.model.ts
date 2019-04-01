export class OurWorkModel {
    _id: string;
    categoryName: string;
    mainCategory: string;
    constructor(
        categoryName: string,
        mainCategory: string,
    ) {
        this.categoryName = categoryName;
        this.mainCategory = mainCategory;
    }
}
