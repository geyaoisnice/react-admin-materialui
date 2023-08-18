import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import OrderCreate from './ordercreate'
import OrderList from './orderlist'
import { Paper } from '@mui/material'

const OrderPool = () => {

  return (
    <div style = {{display: 'flex', flexDirection: 'row'}}>
      <Paper style = {{marginRight: '16px', minWidth: '160px', width: '20%', minHeight: '240px'}}>
        <Link to = 'orderlist'>订单列表</Link>
      </Paper>
      <div style = {{width: '70%'}}>
        <Routes>
            <Route path = 'orderlist' element = {<OrderList />} />
            <Route path = 'ordercreate' element = {<OrderCreate/>} />
        </Routes>
      </div>  
    </div>
  )
}

export default OrderPool