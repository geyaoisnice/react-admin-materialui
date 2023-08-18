import React from 'react'
import { Create, SimpleForm, TextInput } from 'react-admin'

const CustomerCreate = () => {
  return (
    <Create>
        <SimpleForm>
            <TextInput source = 'name' label = '客户名称' />
            <TextInput source = 'address' label = '客户地址' />
            <TextInput source = 'contract' label = '联系人' />
        </SimpleForm>
    </Create>
  )
}

export default CustomerCreate