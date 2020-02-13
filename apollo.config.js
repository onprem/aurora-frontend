const isLocal = true;
module.exports = {
  client: {
    service: {
      name: 'aurora-backend',
      url: isLocal
        ? 'http://localhost:3001/api/graphql'
        : 'https://api.staging.aurorafest.org/api/graphql',
    },
  },
};
