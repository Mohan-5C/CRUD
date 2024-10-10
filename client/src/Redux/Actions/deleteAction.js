import axios from "axios";
import { auth } from "../../Utils/firebase";
import { root } from "../../Utils/Route";
import { deleteUser ,reqStart,reqFailure,reqSuccess} from "../Slices/userReducer";
function deleteAction(id) {
  return async (dispatch) => {
    dispatch(reqStart())
    try {
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken();
      console.log("to token" + token);
      const response = await axios.delete(`${root}/deleteUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(reqSuccess())
      console.log(response.data);
      //  setUsers((users).filter((user)=> user._id!==id))
      dispatch(deleteUser(id));
    } catch (err) {
      console.error(err);
      dispatch(reqFailure())
    }
  };
}

export default deleteAction;
