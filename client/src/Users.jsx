import axios  from "axios";
import {useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { Button,Table} from "antd";
import './App.css'
import propTypes from 'prop-types';
import {auth} from './firebase';
import {root} from './Route';
import { addUser, deleteUser } from "./slices/userReducer";
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux";

export const Users = ({user,setUser}) => {
  // const [users,setUsers]=useState([]);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const users=useSelector((state)=>state.users.users);
  if(!Array.isArray(users)){
    console.log("not an array");
  }
  console.log(users);
  useEffect(()=>{
     const fetchUserData=async()=>{
        try{
           const currentUser=auth.currentUser
           console.log(currentUser)
           if(currentUser){
               const token=await currentUser.getIdToken()
               console.log(token)
               const response = await axios.get(`${root}/me`, {
                 headers: { Authorization: `Bearer ${token}` },
               });    
               console.log(response.data)
              //  setUsers([response.data.users]);
                 if (Array.isArray(response.data.user)) {
                  //  setUsers(response.data.user); // Use response.data.user if it's the array
                   response.data.user.forEach((user)=>dispatch(addUser(user)));
                 } 
                 else if (Array.isArray(response.data)) {
                  //  setUsers(response.data); // Use response.data if it's the array directly
                    response.data.forEach((user)=>dispatch(addUser(user)));
                 } 
                 else {
                   console.error("Unexpected data format:", response.data);
                 }
           }
           else{
             navigate('/login')
           }
        } 
        // catch(err){
        //   console.log(err)
        // }
        catch (err) {
         console.log(err.response ? err.response.data : err.message);
        }
     }


     fetchUserData();
    //  axios.get("http://localhost:3000")
    //  .then((result)=>{
    //    console.log(result.data)
    //    setUsers(result.data.user)  
    //  })
    //  .catch((err)=>{
    //   console.log(err)
    //  })
     
     const storeduser=localStorage.getItem('displayName')
     if(storeduser){
       setUser(storeduser)
     }
    

  },[user,setUser,navigate,dispatch])


  const handleDelete=async(id)=>{
        try{
           const currentUser=auth.currentUser;
           const token=await currentUser.getIdToken();
           console.log("to token"+token)
           const response= await axios.delete(`${root}/deleteUser/${id}`,{headers:{Authorization:`Bearer ${token}`}})
           console.log(response.data)
          //  setUsers((users).filter((user)=> user._id!==id))
          dispatch(deleteUser(id));
        }
        catch(err){
          console.error(err)
        }
        // axios.delete(`http://localhost:3000/deleteUser/${id}`)
        // .then((result)=>{
        //   console.log(result.data)
        //   const newUser=users.filter((user)=>{
        //      if(id==user._id){
        //       return false;
        //      }
        //      else{
        //       return true;
        //      }
        //   })
        //   setUsers(newUser);
        // })
        // .catch((err)=>{
        //   console.log(err)
        // })
        // const newUsers=users.filter((_,i)=>{
        //     if(i==index){
        //         return false;
        //     }
        //     else{
        //         return true;
        //     }
        // })
        // setUsers(newUsers);
       

  };

  const handleLogout=async()=>{
     try{
          await auth.signOut();
          localStorage.removeItem("authToken")
          localStorage.removeItem("displayName")
          setUser("")
          navigate('/home')
     } 
     catch(err){
       console.log(err);
       alert(err);
     }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="link" className="update-btn">
            <Link to={`/update/${record._id}`}>update</Link>
          </Button>
          <Button
            type="link"
            className="delete-btn"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Hello {user}.,</h1>
      <div className="crud">
        <Button type="link">
          <Link to="/create" className="add-btn">
            ADD+
          </Link>
        </Button>
        {/* <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
              <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <Button type="link" className="update-btn"><Link to={`/update/${user._id}`}>update</Link></Button>
                <Button type="link" className="delete-btn" onClick={()=>handleDelete(user._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
        <Table className="table" columns={columns} dataSource={users}  rowKey="_id" />
        <button className="logout-btn" onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
};


Users.propTypes={
   user:propTypes.string.isRequired,
   setUser:propTypes.func.isRequired,
};



