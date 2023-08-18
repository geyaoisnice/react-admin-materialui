import { Box, Button, Typography } from "@mui/material"
import { BulkDeleteButton, CreateButton, Datagrid, Identifier, List, RaRecord, ReferenceField, TextField, TopToolbar, useRedirect } from "react-admin"
import { useNavigate, useParams } from "react-router-dom"

const LineListActions = (props: any) => {
    return(
        <TopToolbar>
            <CreateButton
                to = {`/product/styleCreate/${props.category_id}`}
            />
        </TopToolbar>
    )
}

const Empty = () => {
    const {id: category_id} = useParams();
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/product/styleEdit/${category_id}`);
    }
    
    return(
        <Box textAlign={'center'} m = {1}>
            <Typography variant="h4" paragraph>
                本品类尚无款式
            </Typography>
            <Typography variant="body1">
                新建一个款式
            </Typography>
            <Button onClick={handleClick}>新建款式</Button>
        </Box>
    )
}

const StyleList = () => {
    const {id: category_id} = useParams();
    const redirect = useRedirect();

    const handleLineRowClick = (id: Identifier, resource: string, record: RaRecord): false =>{
        redirect(`/product/styleEdit/${id}`);
        return false;
    }
    return(
        <List resource = 't_prod_style' exporter = {false} hasCreate
            filter = {{category_id: category_id}}
            actions = {<LineListActions category_id = {category_id}/>}
            empty = {<Empty/>}
        >
            <Datagrid
                bulkActionButtons = {<BulkDeleteButton mutationMode="pessimistic"/>}
                rowClick = {handleLineRowClick}
            >
                <TextField source = 'id'/>
                <TextField source = 'code' />
                <TextField source = 'style_name' />
                <ReferenceField source = 'category_id' reference="t_prod_category" label = '所属品类' />
            </Datagrid>
        </List>
    )
}

export default StyleList;