import API_URL from "./api.config";
import axios from "axios";
async function apiGet(url) {
  const config = {
    method: "post",
    mode: "cors",
    headers: { "Access-Controll-Allow-Origin": "*" },
  };
  const urlCall = API_URL + url;
  try {
    const response = await axios.get(urlCall, config);
    return response;
  } catch (error) {
    console.error(error);
  }
}
async function apiPost(url, payload){
    const config = {
        method: "put",
        mode: "cors",
        headers: { "Access-Controll-Allow-Origin": "*" },
        body: payload
      };
    const urlCall = API_URL + url;
    try {
        const response = await axios.post(urlCall, config);
        console.log(response);
        return response;
      } catch (error) {
        console.error(error);
      }
}
async function apiPut(url, payload){
  const config = {
    method: "get",
    mode: "cors",
    headers: { "Access-Controll-Allow-Origin": "*" },
    body: payload
  };
const urlCall = API_URL + url;
try {
    const response = await axios.put(urlCall, config);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
const api = {};
api.getRestaurants = () => {
  return apiGet("restaurants");
};
api.postSuscribedUser = (payload)=>{
    return apiPost('users', payload);
};
api.putSumRestaurantLikes= (payload)=>{
  const restaurantId = payload.id;
  const url = "restaurants/" +restaurantId;
  return apiPut(url, payload.data);
};

api.getRestaurantsByCategory = (category)=>{
  return apiGet("restaurants?category="+category);
};
api.getOneRestaurant = (slug)=>{
  return apiGet("restaurants?slug="+slug);
};
export default api;
