const getDB = (env) => {
  console.log('env',env);
  switch (env) {
    case 'production':
      return {
        host: 'chaz.tacopolice.com',
        port: '80'
      }
    case 'development':
      return {
        host: 'localhost',
        port: '3000'
        // host: 'chaz.tacopolice.com',
        // port: '80'
      }
    default:
      return {
        host: 'localhost',
        port: '3000'
      }
  }
};

let opts = {
  env: process.env.NODE_ENV,//'dev', // ['dev', 'staging', 'prod']
  // codePushDeploymentKey: '',
  ddpConfig: {
    maintainCollections : true,
  }
}

Object.assign(opts.ddpConfig, getDB(opts.env));

export default opts;
