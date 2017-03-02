export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    BUCKET: 'notes-app-uploads',
    DOMAIN: 'https://s3.amazonaws.com'
  },
  apiGateway: {
    URL: 'https://5by75p4gn3.execute-api.us-east-1.amazonaws.com/prod',
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID : 'us-east-1_YEhdMFvix',
    APP_CLIENT_ID : '29qpcqorti0ctjkur5h01dph5g',
    IDENTITY_POOL_ID: 'us-east-1:565cc505-5486-4278-bf0f-9736b9fdd8c5',
  }
};
