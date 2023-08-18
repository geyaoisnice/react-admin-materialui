import { AssignmentReturn } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Create, SaveButton, SimpleForm, TextInput, Toolbar, useRefresh } from "react-admin"
import { useNavigate } from "react-router-dom"

const CategoryCreate = () => {
    const navigate = useNavigate();
    const refresh = useRefresh();

    const CreateToolbar = () => {
        return (
            <Toolbar>
                <SaveButton />
                <Button variant="contained" sx={{ ml: '16px' }} onClick={() => navigate(-1)}><AssignmentReturn /> 返回</Button>
            </Toolbar>
        )
    }
    return (
        <Create resource="t_prod_category"
            mutationOptions={{ onSuccess: () => { navigate(-1); refresh() } }}
        >
            <SimpleForm toolbar={<CreateToolbar />}>
                <TextInput source="tenant_id" />
                <TextInput source="code" />
                <TextInput source="category_name" />
            </SimpleForm>
        </Create>
    )
}

export default CategoryCreate;
