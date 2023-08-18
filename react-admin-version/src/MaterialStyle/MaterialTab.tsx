import { Datagrid, EditButton, TextField } from 'react-admin';
interface IMaterialTab {
    typeId: string
}
export const MaterialTab = (props: IMaterialTab) => {
    const {typeId}=props
    return (
        <Datagrid >
            <TextField source='id' />
            <TextField source='mat_id' />
            <TextField source='style_id' />
            <TextField source='count' />
            <TextField source='description' />
            <EditButton disabled={!typeId?true:false}></EditButton>
        </Datagrid>
    )
}