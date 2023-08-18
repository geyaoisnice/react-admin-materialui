import React from 'react'
import { Create, SimpleForm, TextInput } from 'react-admin'

const OrderTypeCreate = () => {
  return (
    <Create redirect = {'../'}>
        <SimpleForm>
            <TextInput source = 'type_name' label = '类型名称' />
            <TextInput source = 'type_description' label = '类型说明' />
        </SimpleForm>
    </Create>
  )
}

export default OrderTypeCreate