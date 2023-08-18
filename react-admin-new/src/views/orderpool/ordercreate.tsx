import React, { useState } from 'react'
import {Button, Dialog, DialogContent, DialogTitle, Button as MuiButton} from '@mui/material';
import { AutocompleteInput, Create, ReferenceInput, SaveButton, SimpleForm, TextInput, Toolbar, useRefresh } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { AssignmentReturn } from '@mui/icons-material';

const OrderCreate = () => {
  const navigate = useNavigate();

  const CreateCustomerDialog = (props: {open: boolean, onClose: ()=> void}) => {
    const {open, onClose} = props;
    const refresh = useRefresh();

    const CreateToolbar = () =>(
      <Toolbar>
        <SaveButton />
        <Button 
          variant='contained' 
          sx = {{marginLeft: '8px'}}
          onClick = {()=>onClose()}
        >
          <AssignmentReturn/>  返回
        </Button>
      </Toolbar>
    )
    return(
      <Dialog
        open = {open}
      >
        <DialogTitle>新增用户</DialogTitle>
        <DialogContent>
          <Create resource='t_lps_customer' mutationOptions={{onSuccess: ()=> {refresh(); onClose();}}}>
            <SimpleForm toolbar = {<CreateToolbar />}>
              <TextInput source = 'name' label = '客户名称' />
              <TextInput source = 'address' label = '客户地址' />
              <TextInput source = 'contract' label = '联系人' />
            </SimpleForm>
          </Create>
        </DialogContent>
      </Dialog>
    )
  }

  const CreateCustomerButton = () => {
    const [open, setOpen] = useState<boolean>(false);
    const handleAddCustomer = () => {
      setOpen(true);
    }

    const onClose = () => {
      setOpen(false);
    }
    return(
      <div>
        <MuiButton onClick={handleAddCustomer}>
          <LaunchIcon style = {{fontSize: '32px', marginTop: '12px'}}/>
        </MuiButton>
        <CreateCustomerDialog open = {open} onClose={onClose} />
      </div>
    )
  }

  const FormToolbar = () =>(
    <Toolbar>
      <SaveButton />
      <Button 
        variant='contained' 
        sx = {{marginLeft: '8px'}}
        onClick = {()=>navigate(-1)}
      >
        <AssignmentReturn/>返回
      </Button>
    </Toolbar>
  )
  return (
    <Create resource='t_lps_order' mutationOptions={{onSuccess: ()=> {navigate(-1)}}}>
        <SimpleForm toolbar = {<FormToolbar />}>
            <TextInput source = 'order_code' label = '订单编号' />
            <ReferenceInput source = 'type_id' reference='t_lps_order_type'>
              <AutocompleteInput label = '订单类型' />  
            </ReferenceInput>
            <div style = {{display: 'flex', flexDirection: 'row'}}>
              <ReferenceInput source = 'customer_id' reference='t_lps_customer'>
                <AutocompleteInput label = '客户名称' />
              </ReferenceInput>
              <CreateCustomerButton />
            </div>
        </SimpleForm>
    </Create>
  )
}

export default OrderCreate;