// src/config/api.js
const apiConfig = {
    development: {
      strapiApiUrl: "https://glowing-card-fd9f0cfddc.strapiapp.com/api",
    },
    production: {
      strapiApiUrl: "https://glowing-card-fd9f0cfddc.strapiapp.com/api",
    },
  };
  
  const environment = import.meta.env.MODE; // 'development' or 'production'
  
  export const strapiApiUrl = apiConfig[environment].strapiApiUrl;