const {
    NODE_ENV,
    REACT_APP_API_HOST
  } = process.env;

  console.log(process.env);

  const STANDARD = {
    api: REACT_APP_API_HOST,
  }


  export const ENV = NODE_ENV ? NODE_ENV.toUpperCase() : undefined;

  const config = STANDARD;

  export default config;