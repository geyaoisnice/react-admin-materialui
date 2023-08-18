import { RemoveRedEye } from '@mui/icons-material';
import { BulkDeleteButton, Button, CreateButton, Datagrid, Identifier, List, RaRecord, TextField, TopToolbar, useBasename, useRecordContext, useRedirect } from 'react-admin';
import { Link } from 'react-router-dom';

const ListActions = () => {
    const url = useBasename() + '/plantCreate';
    return(
        <TopToolbar>
            <CreateButton
                to = {url}
            />
        </TopToolbar>
    )
}

const ShowRecordButton = () => {
    const record = useRecordContext();
    return(
        <Button
            component={Link}
            to = {`/plantShow/${record.id}/show`}
            onClick={(e)=>e.stopPropagation()}
            label='查看'
        >
            {<RemoveRedEye/>}
        </Button>
    )
}

const PlantList = () => {
    let url = useBasename() + '/plantEdit';
    const redirect = useRedirect();

    const handleRowClick = (id: Identifier, resource: string, record: RaRecord): false => {
        url = url + `/${id}`;
        redirect(url);
        return false;
    }

    return(
        <List resource = 't_lps_plant' 
            exporter = {false} 
            hasCreate 
            sx = {{width: '100%'}}
            actions = {<ListActions/>}
        >
            <Datagrid sx = {{width: '100%'}}
                bulkActionButtons = {<BulkDeleteButton mutationMode='pessimistic' />}
                rowClick = {handleRowClick}
            >
                <TextField source = 'name' label = '名称' />
                <TextField source = 'code' label = '编码' />
                <TextField source = 'description' label = '说明' />
                <ShowRecordButton />
            </Datagrid>
        </List>
    )
}

export default PlantList;