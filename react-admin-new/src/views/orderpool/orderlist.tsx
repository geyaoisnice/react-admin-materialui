import React from 'react'

import { Button, CreateButton, Datagrid, List, ReferenceField, TextField, TopToolbar } from 'react-admin'
import { Link } from 'react-router-dom'

const OrderList = () => {
    const Empty = () => (
        <Button component={Link} to = '../ordercreate' label = '新建' />
      )

    const ListActions = () => {
        return(
          <TopToolbar>
            <CreateButton
              to = '../ordercreate'
            />
          </TopToolbar>
        )
      }

    return (
        <List resource='t_lps_order' exporter = {false} hasCreate
        actions = {<ListActions />}
        empty = {<Empty/>}
    >
        <Datagrid>
            <TextField source = 'order_code' />
            <ReferenceField source = 'type_id' reference='t_lps_order_type' label = '订单类型' link = {false} />
            <ReferenceField source = 'customer_id' reference='t_lps_customer' label = '客户名称' link = {false} />
        </Datagrid>
    </List>
    )
}

export default OrderList