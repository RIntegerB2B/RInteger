import { environment } from '../../environments/environment';
export const AppSetting: AppSettingType = {
    awsServiceUrl: 'http://ec2-13-126-16-163.ap-south-1.compute.amazonaws.com:3001/',
    local3010BuyerServiceUrl: 'http://localhost:3011/',
<<<<<<< Updated upstream
 serviceUrl: environment.serviceUrl,
  adminServiceUrl: environment.adminServiceUrl,
<<<<<<< HEAD
/*      serviceUrl: 'http://localhost:3011/',
=======
    /*   serviceUrl: 'http://localhost:3011/',
>>>>>>> 1847400a3c4d926e0a7a415dffe48e2041028ac7
   adminServiceUrl: 'http://localhost:3012/' */
=======
/*  serviceUrl: environment.serviceUrl,
  adminServiceUrl: environment.adminServiceUrl, */
     serviceUrl: 'http://localhost:3011/',
   adminServiceUrl: 'http://localhost:3012/'
>>>>>>> Stashed changes
};
