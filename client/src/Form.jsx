// import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
// import { useState } from "react";
import { auth } from "./Utils/firebase";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

export const FormComponent = ({ setUser }) => {
  // const [email,setEmail]=useState("")
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    // e.preventDefault();
    const { email, password } = values;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setUser(email);
      navigate("/user");
      console.log(email + " " + password);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  return (
    <Form
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
  );
};
export { FormComponent as Form };

FormComponent.propTypes = {
  setUser: propTypes.func.isRequired,
};
