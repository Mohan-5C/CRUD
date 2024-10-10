// import {useState} from "react"
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";

export const Register = () => {
  //   const [email,setEmail]=useState('')
  //   const [password,setPassword]=useState('')
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    // e.preventDefault();
    const { email, password } = values;
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      alert("Email Id registered successfully...! please login");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <div className="register-body">
      <h1>Register Page</h1>
      {/* <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input name="email" type="email" placeholder="enter the email" onChange={(e)=>setEmail(e.target.value)} />
        <label>Password</label>
        <input name="password" type="password" placeholder="enter password" onChange={(e)=>setPassword(e.target.value)}/>
        <button>Register</button>
      </form> */}
      <Form
        className="register-form"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
