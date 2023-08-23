import { Box, Button, Typography } from "@mui/material";
import { Datagrid, EditButton, List, TextField, ReferenceManyCount, ReferenceField } from "react-admin"
import { useNavigate, useParams } from "react-router-dom";
const Empty = () => {
    const {id: plant_id} = useParams();
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/t_geyao_teacher/create`);
    }
    
    return(
        <Box textAlign={'center'} m = {1}>
            <Typography variant="h4" paragraph>
                当前没有教师
            </Typography>
            <Typography variant="body1">
                新加入一个教师信息
            </Typography>
            <Button onClick={handleClick}>新建教师</Button>
        </Box>
    )
}
const TeacherList = () => {
    return (
        <List empty={<Empty/>} exporter={false} hasCreate={true} resource="t_geyao_teacher"
        >
            <Datagrid >
                <TextField source='id' />
                <TextField source='teacher_name' />
                <ReferenceField source = 'class_id' reference="t_geyao_class" label = '班级名称' />
                <EditButton></EditButton>
            </Datagrid>
        </List>
    )
}
export default TeacherList