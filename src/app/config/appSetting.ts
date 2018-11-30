import { environment } from '../../environments/environment';
export const AppSetting: AppSettingType = {
    awsServiceUrl: 'http://ec2-13-126-16-163.ap-south-1.compute.amazonaws.com:3001/',
    local3010BuyerServiceUrl: 'http://localhost:3011/',

     /* serviceUrl: 'http://localhost:4011/', */
   /* adminServiceUrl: 'http://localhost:3012/', */
  /*  imageOurWorkServerPath: 'https://rinteger.com/admin/images/ourwork/', */
    imageOurWorkServerPath: 'http://localhost/RIntegerWorks/',
    serviceUrl: environment.serviceUrl,
    adminServiceUrl: environment.adminServiceUrl
};
