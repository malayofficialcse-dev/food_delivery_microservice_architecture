import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// /Auth Service Instance
export const authService = axios.create({
    baseURL:process.env.AUTH_SERVICE_URL,
    timeout:5000,
    headers:{
        "Content-Type":"application/json"
    },
});

//Product service instance
export const productService  = axios.create({
    baseURL:process.env.PRODUCT_SERVICE_URL,
    timeout:5000,
    headers:{
        "Content-Type":"application/json"
    }
});

//payment service instance
export const paymentService = axios.create({
    baseURL:process.env.PAYMENT_SERVICE_URL,
    timeout:5000,
    headers:{
        "Content-Type":"application/json",
    },
});


//attach autorization token
const attachAuthToken = (config:any) => {
    const token = process.env.SERVICE_TOKEN;

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}


authService.interceptors.request.use(attachAuthToken);
productService.interceptors.request.use(attachAuthToken);
paymentService.interceptors.request.use(attachAuthToken);

/**
 * Common Response Error Handler
 */
const handleError = (error: any) => {
  if (error.response) {
    console.error(
      `Service Error [${error.response.status}]:`,
      error.response.data
    );
  } else if (error.request) {
    console.error("No response received from service.");
  } else {
    console.error("Axios Error:", error.message);
  }

  return Promise.reject(error);
};

authService.interceptors.response.use(
  (response) => response,
  handleError
);

productService.interceptors.response.use(
  (response) => response,
  handleError
);

paymentService.interceptors.response.use(
  (response) => response,
  handleError
);