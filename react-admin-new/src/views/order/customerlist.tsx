import React from 'react'
import { CreateButton, Datagrid, List, TextField } from 'react-admin';

const CustomerEmpty = () => (
    <CreateButton label = '新建' />
)

const CustomerList = () => {
  return (
    <List exporter = {false} hasCreate
        empty = {<CustomerEmpty/>}
    >
        <Datagrid>
            <TextField source = 'name' />
            <TextField source = 'address' />
            <TextField source = 'contract' />
        </Datagrid>
    </List>
  )
}

export default CustomerList;