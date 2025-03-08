// src/config/api.js
const apiConfig = {
    development: {
      strapiApiUrl: "http://localhost:1337/api",
    },
    production: {
      strapiApiUrl: "https://joyful-sharing-7d3839d273.strapiapp.com/api",
    },
  };
  
  const environment = import.meta.env.MODE; // 'development' or 'production'
  
  export const strapiApiUrl = apiConfig[environment].strapiApiUrl;