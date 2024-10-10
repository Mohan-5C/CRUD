import { auth } from "../../Utils/firebase";
import axios from "axios";
import { root } from "../../Utils/Route";
import { addUser } from "../Slices/userReducer";
import { reqStart,reqSuccess,reqFailure } from "../Slices/userReducer";

function fetchAction(navigate) {
  return async (dispatch) => {
    dispatch(reqStart());
    try {
      const currentUser = auth.currentUser;
      console.log(currentUser);
      if (currentUser) {
        const token = await currentUser.getIdToken();
        console.log(token);
        const response = await axios.get(`${root}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(reqSuccess())
        console.log(response.data);
        //  setUsers([response.data.users]);
        if (Array.isArray(response.data.user)) {
          //  setUsers(response.data.user); // Use response.data.user if it's the array
          console.log("hello");
          response.data.user.forEach((user) => dispatch(addUser(user)));
          console.log("welcome");
          
        } else if (Array.isArray(response.data)) {
          //  setUsers(response.data); // Use response.data if it's the array directly
          response.data.forEach((user) => dispatch(addUser(user)));s
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } else {
        dispatch(reqFailure());
        navigate("/login");
      }
    } catch (err) {
      // catch(err){
      //   console.log(err)
      // }
      console.log(err.response ? err.response.data : err.message);
    }
  };
}

export default fetchAction;
