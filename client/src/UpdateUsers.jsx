import { useEffect, } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios'
import { Button, Form, Input } from "antd";
import "./App.css";
import {auth} from './firebase'
import { useForm } from "antd/es/form/Form";
import {root} from './Route';
import {updateUser} from "./slices/userReducer";
import { useDispatch } from "react-redux";

export const UpdateUsers = () => {
  const {id}=useParams()
  const [form]=useForm()
  // const [name,setName] =useState("")
  // const [email,setEmail]=useState("")
  // const [age,setAge]=useState("")
  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(()=>{
      const fetchUserData=(async()=>{
        try{
              const currentUser = auth.currentUser;
              if(!currentUser){
                console.log("no user is currently signed in");
                return;
              }
              const token = await currentUser.getIdToken();
              const response=await axios.get(`${root}/${id}`, {
                headers: { Authorization:`Bearer ${token}` },
              });
              console.log(response.data)
              const userData=response.data.user;
              if(userData){
                form.setFieldsValue(userData); 
              }
              else{
                console.log("not available user data.")
              }
        }
        catch(err){
          console.error(err)
        }
      })
      // axios.get(`http://localhost:3000/${id}`,{headers:{Authorization:`Bearer ${token}`}})
      // .then((result)=>{
      //   console.log(result)
      //   // setName(result.data.name || "")
      //   // setEmail(result.data.email || "");
      //   // setAge(result.data.age || "");
      // })
      // .catch((err)=>{
      //   console.log(err)
      // })
      fetchUserData()

  },[id,form])

  const  handleSubmit=async(values)=>{
      // e.preventDefault();
      try{
        const currentUser = auth.currentUser;
        const token = await currentUser.getIdToken();
        const response=await axios.put(`${root}/updateUser/${id}`,values,{
          headers:{Authorization:`Bearer ${token}`}
        })
        console.log(response.data)
        if(response.data.user){
          dispatch(updateUser({id:response.data.user.id,...values}));
        }
        else{
          console.log("user data not found in response data",response.data);
        }
        navigate('/user')
      }
      catch(err){
        console.error("error"+err)
      }
      
  }
  
  
  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <h1>Update User</h1>
    //     <label>Name:</label>
    //     <input placeholder="enter the name" type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
    //     <br></br>
    //     <br></br>
    //     <label>Email:</label>
    //     <input placeholder="enter the email" type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
    //     <br></br>
    //     <br></br>
    //     <label>Age:</label>
    //     <input placeholder="enter the age" type="Number" value={age} onChange={(e)=>{setAge(e.target.value)}} />
    //     <br></br>
    //     <br></br>
    //     <button>Update</button>
    //   </form>
    // </div>

    <div className="myForm">
      <Form className="form" onFinish={handleSubmit}>
        <h1>UPDATE USER</h1>
        <div className="div">
          <Form.Item
            label="Name"
            className="Input"
            name="name"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="input placeholder"
              type="text"
              // onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            className="Input"
            label="Email"
            name="email"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="input placeholder"
              type="text"
              // onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            className="Input"
            label="Age"
            name="age"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="input placeholder"
              type="Number"
              // onChange={(e) => setAge(e.target.value)}
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}


