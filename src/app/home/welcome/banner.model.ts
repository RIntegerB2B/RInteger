export class Banner {
    _id: string;
    bannerName: string;
    bannerImage: string;
    constructor(
        bannerName: string,
        bannerImage: string,
    ) {
        this.bannerName = bannerName;
        this.bannerImage = bannerImage;
    }
}
