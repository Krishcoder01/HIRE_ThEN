import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import  '../App.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {registerUser} from '../services/ApiCalls'



const Register = () => {
  const navigate = useNavigate();

    const onFinish = async (values) => {
      localStorage.removeItem("token");
       const response = await registerUser(values);
        if(response.status === 201){
          alert('Registration Successfull');
          const token = response.data.token;
          localStorage.setItem("token", token);
          navigate('/dashboard');
        }
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


  return (
    <div className='w-full h-screen px-4 py-8 relative flex bg-[#E9EBF1] justify-center items-center'>
        <div className='container py-12 bg-white relative px-6 w-[85%] shadow-md h-full rounded-md '>
          <h1 className="font-bold text-2xl text-center mb-8">Signup</h1>
        <Form
        className='w-[70%]'
    name="register"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 800,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>
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
        Register
      </Button>
    </Form.Item>
  </Form>
  <h2 className='text-center mt-4'>Already have an account ? <Link to={'/login'}>Login</Link></h2>
        </div>
    </div>
  )
}

export default Register