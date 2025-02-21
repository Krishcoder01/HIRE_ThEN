import React, { useState , useEffect } from 'react';
import { Button, Drawer, Space ,Form, Input, InputNumber, Table, Tag } from 'antd';
import '../App.css'
import { DoubleRightOutlined, PlusOutlined } from '@ant-design/icons';
import {addBudget ,addTransaction , getBudget ,getTransaction} from '../services/ApiCalls'

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('right');
    const [switcher, setswitcher] = useState(true);
    const [transaction, settransaction] = useState([]);
    const [budget, setbudget] = useState([]);



    const columns = [
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
      },
    ];

    const columns2 = [
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Limit',
        dataIndex: 'limit',
        key: 'limit',
      },
    ];



    const showDrawerTransaction = () => {
      setOpen(true);
      setswitcher(true);
    };
    const showDrawerBudget = () => {
      setOpen(true);
      setswitcher(false);
    }
    const onChange = (e) => {
      setPlacement(e.target.value);
    };
    const onClose = () => {
      setOpen(false);
    };

   async  function onFinish  (values) {
      if(switcher){
        const response = await addTransaction(values);
        settransaction([...transaction , response.data]);
        
      }else{
        const response = await addBudget(values);
        setbudget([...budget , response.data]);
      }
 };

        function onFinishFaile  (errorInfo)  {
        console.log('Failed:', errorInfo);
        };

    async function getBudgets(){
      const response = await getBudget();
      setbudget(response.data);
    }

    async function getTransactions(){
      const response = await getTransaction();
      settransaction(response.data);
    }

    useEffect(() => {
      getBudgets();
      getTransactions();
    }, []);

  return (
    <div className='min-h-screen relative bg-[#E9EBF1] w-full px-4 py-4 '>
        <h1 className='font-bold text-2xl text-center'>Dashboard</h1>
        <div className='flex gap-8 justify-center items-center mt-8 mb-8'>
                 <div><Button onClick={showDrawerTransaction} type="primary" shape="round" icon={<PlusOutlined />} size={'large'}>
                Add Transaction
          </Button></div>
          <div><Button onClick={showDrawerBudget} type="primary" shape="round" icon={<DoubleRightOutlined />} size={'large'}>
                Add Budget
          </Button></div>
        </div>
        {switcher ? <Drawer
        title="Add Transaction"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form
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
    onFinishFailed={onFinishFaile}
    autoComplete="off"
  >
    <Form.Item
      label="Amount"
      name="amount"
      rules={[
        {
        type: 'number',
          required: true,
          message: 'Please input your amount!',
        },
      ]}
    >
      <InputNumber />
    </Form.Item>

    <Form.Item
      label="Type"
      name="type"
      help='income or expense'
      rules={[
        {
          required: true,
          message: 'Please input your type!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Category"
      name="category"
      rules={[
        {
          required: true,
          message: 'Please input your Category!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Note"
      name="note"
    >
      <Input />
    </Form.Item>
    <Form.Item label={null}>
            <Button type="primary" htmlType='submit' onClick={onClose}>
              OK
            </Button>
    </Form.Item>
  </Form>
      </Drawer> : <Drawer
        title="Add Budget"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form
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
    onFinishFailed={onFinishFaile}
    autoComplete="off"
  >
    <Form.Item
      label="Limit"
      name="limit"
      rules={[
        {
        type: 'number',
          required: true,
          message: 'Please input your amount!',
        },
      ]}
    >
      <InputNumber />
    </Form.Item>

    <Form.Item
      label="Category"
      name="category"
      help='income or expense'
      rules={[
        {
          required: true,
          message: 'Please input your Category!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item label={null}>
            <Button type="primary" htmlType='submit' onClick={onClose}>
              OK
            </Button>
    </Form.Item>
  </Form>
      </Drawer>}

      <div className='flex w-full justify-between relative'>
        <div className='w-[65%] relative'>
        <Table columns={columns} dataSource={transaction} />
        </div>
        <div className='w-[33%]'>
        <Table columns={columns2} dataSource={budget} />
        </div>
      </div>


    </div>
  )
}

export default Dashboard