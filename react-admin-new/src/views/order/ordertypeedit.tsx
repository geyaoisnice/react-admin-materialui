import React from 'react'
import { Edit, SimpleForm, TextInput } from 'react-admin';

const OrderTypeEdit = () => {
  return (
    <Edit>
        <SimpleForm>
            <TextInput source = 'type_name' />
            <TextInput source = 'type_description' />
        </SimpleForm>
    </Edit>
  )
}

export default OrderTypeEdit;