import { Box, Button, Typography } from "@mui/material";
import { Datagrid, EditButton, List, TextField, ReferenceManyCount, ReferenceField } from "react-admin"
import { useNavigate, useParams } from "react-router-dom";
const Empty = () => {
    const { id: plant_id } = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/t_geyao_class/create`);
    }

    return (
        <Box textAlign={'center'} m={1}>
            <Typography variant="h4" paragraph>
                当前没有班级
            </Typography>
            <Typography variant="body1">
               新建班级
            </Typography>
            <Button onClick={handleClick}>新建班级</Button>
        </Box>
    )
}
const ClassList = () => {
    return (
        <List empty={<Empty />} exporter={false} hasCreate={true} resource="t_geyao_class"
        >
            <Datagrid >
                <TextField source='id' />
                <TextField source='class_name' />
                <ReferenceField source = 'school_id' reference="t_geyao_school" label = '学校名称' />
                <EditButton></EditButton>
            </Datagrid>
        </List>
    )
}
export default ClassList