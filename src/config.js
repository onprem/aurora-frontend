const isProd = process.env.REACT_APP_ENV === 'production';
const isLocal = process.env.REACT_APP_ENV === 'local';

const API_PROD_URL = 'https://api.aurorafest.org';
const API_STG_URL = 'https://api.staging.aurorafest.org';
const API_LOCAL = 'http://10.20.0.4:3001';

const GCS_BASE_URL = 'https://storage.googleapis.com';

let apiUrl;
if (isProd) apiUrl = API_PROD_URL;
else if (isLocal) apiUrl = API_LOCAL;
else apiUrl = API_STG_URL;

const closedEvents = localStorage.getItem('open') === 'yes' ? [] : [2, 7, 19];

const config = {
  apiUrl: `${apiUrl}/api/graphql`,
  gcsBucketUrl: `${GCS_BASE_URL}/${isProd ? 'aurora-dp/' : 'aurora-stg-dp/'}`,
  closedEvents,
};

export default config;
