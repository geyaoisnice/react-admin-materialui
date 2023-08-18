import { Box, Button, Typography } from "@mui/material"
import { BulkDeleteButton, CreateButton, Datagrid, Identifier, List, RaRecord, ReferenceField, TextField, TopToolbar, useRedirect } from "react-admin"
import { useNavigate, useParams } from "react-router-dom"

const LineListActions = (props: any) => {
    return(
        <TopToolbar>
            <CreateButton
                to = {`/lineCreate/${props.plant_id}`}
            />
        </TopToolbar>
    )
}

const Empty = () => {
    const {id: plant_id} = useParams();
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/lineCreate/${plant_id}`);
    }
    
    return(
        <Box textAlign={'center'} m = {1}>
            <Typography variant="h4" paragraph>
                本厂尚无产线
            </Typography>
            <Typography variant="body1">
                新建一个产线
            </Typography>
            <Button onClick={handleClick}>新建产线</Button>
        </Box>
    )
}

const LineList = () => {
    const {id: plant_id} = useParams();
    const redirect = useRedirect();

    const handleLineRowClick = (id: Identifier, resource: string, record: RaRecord): false =>{
        redirect(`/lineEdit/${id}`);
        return false;
    }
    return(
        <List resource = 't_lps_line' exporter = {false} hasCreate
            filter = {{plant_id: plant_id}}
            actions = {<LineListActions plant_id = {plant_id}/>}
            empty = {<Empty/>}
        >
            <Datagrid
                bulkActionButtons = {<BulkDeleteButton mutationMode="pessimistic"/>}
                rowClick = {handleLineRowClick}
            >
                <TextField source = 'code' label = '产线编码' />
                <TextField source = 'name' label = '产线名称' />
                <ReferenceField source = 'plant_id' reference="t_lps_plant" label = '所属工厂' />
            </Datagrid>
        </List>
    )
}

export default LineList;