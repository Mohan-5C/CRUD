import { useEffect, } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios'
import { Button, Form, Input } from "antd";
import "./App.css";
import {auth} from './firebase'
import { useForm } from "antd/es/form/Form";
import {root} from './Route'

export const UpdateUsers = () => {
  const {id}=useParams()
  const [form]=useForm()
  // const [name,setName] =useState("")
  // const [email,setEmail]=useState("")
  // const [age,setAge]=useState("")
  const navigate=useNavigate()
  
  useEffect(()=>{
      const fetchUserData=(async()=>{
        try{
              const currentUser = auth.currentUser;
              const token = await currentUser.getIdToken();
              const response=await axios.get(`${root}/${id}`, {
                headers: { Authorization:`Bearer ${token}` },
              });
              console.log(response.data)
              form.setFieldsValue(response.data.user); 
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


