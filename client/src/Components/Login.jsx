// import { useState } from "react";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { Button, Checkbox, Form, Input } from "antd";

export const Login = ({ setUser }) => {
  // const [email,setEmail]=useState('')
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    //  e.preventDefault();
    const { email, password } = values;
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      if (!user.displayName) {
        await user.updateProfile({
          displayName: email.split("@")[0],
        });
        user.displayName = email.split("@")[0];
      }

      const displayName = user.displayName || user.email;

      setUser(displayName);
      console.log(displayName);
      localStorage.setItem("displayName", displayName);
      //  const token=btoa(email);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("authToken", token);
      navigate("/user");
      console.log(email + " " + password);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    // <div>
    //   <h1>Login Page</h1>
    //   <form onSubmit={handleSubmit} >
    //     <label>Email</label>
    //     <input name="email"type="email" placeholder="enter the email" onChange={(e)=>setEmail(e.target.value)} />
    //     <label>Password</label>
    //     <input name="password" type="password" placeholder="enter password" onChange={(e)=>setPassword(e.target.value)}/>
    //     <button>login</button>
    //   </form>
    // </div>
    <div className="login-body">
      <h1>Login Page</h1>
      <Form
        className="login-form"
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
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

Login.propTypes = {
  setUser: propTypes.func.isRequired,
};
