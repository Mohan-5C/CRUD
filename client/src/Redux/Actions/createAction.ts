import axios from "axios";
import { root } from "../../Utils/Route";
import { reqStart,reqSuccess,reqFailure } from "../Slices/userReducer";
// import { func } from "prop-types";
import { NavigateFunction } from "react-router-dom";
import {AppDispatch} from '../Store'; 

function delay(ms:number){
   console.log("delay")
   return new Promise ((resolve)=> setTimeout(resolve,ms));
}

function createAction(values:{email:string,password:string}, navigate:NavigateFunction) {
  return async (dispatch:AppDispatch) => {
    dispatch(reqStart());
    const token = localStorage.getItem("authToken");

    console.log("your token is" + token);
    if (!token) {
      console.log("no token");
    }
    
    try {
      console.log(values);

      //  const response= await axios.post("http://backend:3000/createUser",values,{
      //   headers:{Authorization: token}
      //  });
      const response = await axios.post(`${root}/createUser`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await delay(1000);
      dispatch(reqSuccess());
      console.log(response.data);
      navigate("/user");
    } catch (err) {
      // console.log("error",err.response ? err.response.data : err.message)
      dispatch(reqFailure());
      console.error("Error:", (err as any).response ? (err as any).response.data : (err as any).message);
    }
  };
}
export default createAction;
