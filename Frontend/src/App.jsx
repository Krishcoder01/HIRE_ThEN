import React from 'react';
import Routing from './utils/Routing';
import { Button, ConfigProvider, Space } from 'antd';

const App = () => {
  return (
    <>
    <ConfigProvider theme={{colorBgBase : "#E9EBF1" , colorPrimary :"#fffff"}}>
    <Routing/>
    </ConfigProvider>
    </>
  )
}

export default App