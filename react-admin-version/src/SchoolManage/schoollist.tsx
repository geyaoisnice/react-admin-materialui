import { Box, Button, Typography } from "@mui/material";
import { Datagrid, EditButton, List, TextField, ReferenceManyCount } from "react-admin"
import { useNavigate, useParams } from "react-router-dom";
const Empty = () => {
    const { id: plant_id } = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/t_geyao_school/create`);
    }

    return (
        <Box textAlign={'center'} m={1}>
            <Typography variant="h4" paragraph>
                当前没有学校
            </Typography>
            <Typography variant="body1">
                新加入一个学校信息
            </Typography>
            <Button onClick={handleClick}>新建学校</Button>
        </Box>
    )
}
const SchoolList = () => {
    return (
        <List empty={<Empty />} exporter={false} hasCreate={true} resource="t_geyao_school"
        >
            <Datagrid >
              
                <TextField source='id' />
                <TextField source='school_name' />
                <EditButton></EditButton>
            </Datagrid>
        </List>
    )
}
export default SchoolList