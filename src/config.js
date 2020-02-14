const isProd = process.env.REACT_APP_ENV === 'production';
const isLocal = process.env.REACT_APP_ENV === 'local';

const API_PROD_URL = 'https://api.aurorafest.org';
const API_STG_URL = 'https://api.staging.aurorafest.org';
const API_LOCAL = 'http://localhost:3001';

const GCS_BASE_URL = 'https://storage.googleapis.com';

let apiUrl;
if (isProd) apiUrl = API_PROD_URL;
else if (isLocal) apiUrl = API_LOCAL;
else apiUrl = API_STG_URL;

const closedEvents =
  localStorage.getItem('open') === 'yes'
    ? []
    : [
        1,
        3,
        2,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
      ];

const config = {
  apiUrl: `${apiUrl}/api/graphql`,
  gcsBucketUrl: `${GCS_BASE_URL}/${isProd ? 'aurora-dp/' : 'aurora-stg-dp/'}`,
  closedEvents,
};

export default config;
