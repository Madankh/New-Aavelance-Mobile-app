import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { sellerloginFailure, sellerloginStart, sellerloginSuccess } from "../redux/sellerSlice";
import {addProductStart , addProductSuccess , addProductFailure} from "./productRedux";
import {updateProductStart , updateProductSuccess , updateProductFailure} from "./productRedux";
import axios from "axios";
import { sellerRequest } from "./requestMethod";

export const login = async(dispatch , user)=>{
    dispatch(loginStart());
    try{
        const res = await axios.post("http://139.162.11.30:80/api/auth/login" , user);
        dispatch(loginSuccess(res.data))
        
   }catch(err){
     dispatch(loginFailure(err?.response?.data))
  }
}

export const register = async(dispatch , user)=>{
  dispatch(loginStart());
  try {
    const res = await axios.post("http://139.162.11.30:80/api/auth/register" , user);
    dispatch(loginSuccess(res.data))
  } catch (err) {
    dispatch(loginFailure(err?.response?.data))
  }
}

export const VerifyUser = async(dispatch , user)=>{
  dispatch(loginStart());
  try{
      const res = await axios.post("http://139.162.11.30:80/api/auth/verify/email" , user);
      dispatch(loginSuccess(res.data))
 }catch(err){
   dispatch(loginFailure())
}
}



// export const VerifyInfluencer = async(dispatch , influencer)=>{
//   dispatch(loginInfluencerStart());
//   try{
//       const res = await publicRequest.post("/influencer/verify/email" , influencer);
//       dispatch(loginInfluencerSuccess(res.data))
//  }catch(err){
//    dispatch(loginInfluencerFailure())
// }
// }

export const sellerlogin = async(dispatch , seller)=>{
  dispatch(sellerloginStart());
  try{
      const res = await axios.post("http://139.162.11.30:80/api/seller/login" , seller);
      dispatch(sellerloginSuccess(res.data))
      
 }catch(err){
   dispatch(sellerloginFailure(err?.response?.data))
}
}

export const VerifySeller = async(dispatch , seller)=>{
  dispatch(SellerloginStart());
  try{
      const res = await axios.post("http://139.162.11.30:80/api/seller/verify/email" , seller);
      dispatch(SellerloginSuccess(res.data))
 }catch(err){
   dispatch(SellerloginFailure())
}
}

export const sellerregister = async(dispatch , seller)=>{
dispatch(loginStart());
try {
  const res = await axios.post("http://139.162.11.30:80/api/seller/register" , seller);
  dispatch(sellerloginSuccess(res.data))
} catch (err) {
  dispatch(sellerloginFailure(err?.response?.data))
}
}

export const addProduct = async ( dispatch , product) => {
  dispatch(addProductStart());
  try {
    const res = await sellerRequest.post("/products/product", product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const updateProduct = async(id, product, dispatch)=>{
  dispatch(updateProductStart());
  try{
      dispatch(updateProductSuccess({id , product}))
      
 }catch(err){
   dispatch(updateProductFailure())
}
}