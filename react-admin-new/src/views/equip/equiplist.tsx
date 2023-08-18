import React from 'react'
import { Datagrid, List, TextField } from 'react-admin';

const EquipList = () => {
    return ( 
        <List exporter = {false} hasCreate>
            <Datagrid
                rowClick = {'edit'}
            >
                <TextField source = 'code' label = '设备编号'/>
                <TextField source = 'name' label = '设备名称' />
                <TextField source = 'description' label = '设备说明' />
            </Datagrid>
        </List>
     );
}
 
export default EquipList;