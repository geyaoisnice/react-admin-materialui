import { CreateButton, Datagrid, List, TextField } from 'react-admin'

const Empty = (props: any) => {
    const {hasCreate, ...rest} = props;
    return (
        <CreateButton {...rest} label = '新建'/>
    );
}

const OrderTypeList = (props: any) => {
    return (
        <List exporter = {false}
            empty = {<Empty/>}
        >
            <Datagrid
                rowClick = {'edit'}
            >
                <TextField source = 'type_name' label = '类型名称' />
                <TextField source = 'type_description' label = '类型说明' />
            </Datagrid>
        </List>
  )
}

export default OrderTypeList

