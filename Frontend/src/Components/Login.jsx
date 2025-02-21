import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import  '../App.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {loginUser} from '../services/ApiCalls'

const Login = () => {
  const navigate = useNavigate();
   const onFinish = async (values) => {
          localStorage.removeItem("token");
          const response = await loginUser(values);
          console.log(response);
          console.log(response.status);
          if(response.status === 200){
            alert('Login Successfull');
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate('/dashboard');
          }
        };
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };
  
  
    return (
      <div className='w-full h-screen  relative flex justify-center py-8 items-center bg-[#E9EBF1]'>
        <div className='container w-[85%] relative h-full px-4 py-16  bg-white shadow-md rounded-md'>
          <h1 className='font-bold text-2xl text-center mb-18'>Login Form</h1>
          <Form
      name="register"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: '800px',
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
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
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
  
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>

    <h2 className='text-center mt-4'>Don,t have an account ? <Link to={'/register'}>Signup</Link></h2>
        </div>
      </div>
    )
}

export default Login