import axios from "axios";
import { auth } from "../../Utils/firebase";
import { useDispatch } from "react-redux";
import { updateUser,reqFailure,reqSuccess,reqStart } from "../Slices/userReducer";
import { root } from "../../Utils/Route";

function updateAction(id, values, navigate) {
  return async (dispatch) => {
    dispatch(reqStart())
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.log("no user is currently signed in");
        return;
      }
      const token = await currentUser.getIdToken();
      console.log("id", id);

      const updateresponse = await axios.put(
        `${root}/updateUser/${id}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(reqSuccess())
      console.log(updateresponse.data);
      if (updateresponse.data.user) {
        dispatch(updateUser({ id: updateresponse.data.user._id, ...values }));
        console.log("updateeee");
      } else {
        console.log(
          "user data not found in response data",
          updateresponse.data
        );
      }
      navigate("/user");
    } catch (err) {
      console.error(
        "error" + err.response ? err.response.data : err.response.message
      );
      dispatch(reqFailure())
    }
  };
}

export default updateAction;
