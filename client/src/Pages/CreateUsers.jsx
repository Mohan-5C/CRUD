// import {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import "../App.css";
import { root } from "../Utils/Route";
import { useDispatch } from "react-redux";
import createAction from "../Redux/Actions/createAction";

export const CreateUsers = () => {
  // const[name,setName]=useState("")
  // const[email,setEmail]=useState("")
  // const[age,setAge]=useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSumbit = async (values) => {
    // const token = localStorage.getItem("authToken");
    // console.log("your token is"+token)
    // if (!token) {
    //   console.log("no token");
    // }
    // try{
    //    console.log(values)

    //   //  const response= await axios.post("http://backend:3000/createUser",values,{
    //   //   headers:{Authorization: token}
    //   //  });
    //    const response = await axios.post(`${root}/createUser`, values, {
    //      headers: { Authorization: `Bearer ${token}` },
    //    });
    //    console.log(response.data)
    //    navigate('/user')
    // }
    // catch(err){
    //   // console.log("error",err.response ? err.response.data : err.message)
    //   console.error("Error:", err.response ? err.response.data : err.message);
    // }
    dispatch(createAction(values, navigate));
    // try {
    //   const response = await axios.post(
    //     "http://localhost:3000/createUser",
    //     values,
    //     {
    //       headers: { Authorization: `Bearer ${token}` },
    //     }
    //   );
    //   console.log("Response:", response.data);
    //   navigate("/user");
    // } catch (err) {
    //   console.log("Error:", err);
    // }

    // e.preventDefault();
    // axios.post("http://localhost:3000/createUser",values)
    // .then((result)=>{
    //   console.log(result.data)
    //   navigate('/')
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
  };

  return (
    // <div>
    //   <form className="form" onSubmit={handleSumbit}>
    //     <h1>Add Users</h1>
    //     <label>Name:</label>
    //     <input placeholder="enter the name" type="text" onChange={(e) => setName(e.target.value)}
    //     />
    //     <br></br>
    //     <br></br>
    //     <label>Email:</label>
    //     <input placeholder="enter the email" type="text" onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <br></br>
    //     <br></br>
    //     <label>Age:</label>
    //     <input placeholder="enter the age"   type="Number" onChange={(e) => setAge(e.target.value)}
    //     />
    //     <br></br>
    //     <br></br>
    //     <button type="text" className="create-btn">Submit</button>
    //   </form>
    // </div>
    <div className="myForm">
      <Form className="form" onFinish={handleSumbit}>
        <h1>ADD DETAILS</h1>
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
