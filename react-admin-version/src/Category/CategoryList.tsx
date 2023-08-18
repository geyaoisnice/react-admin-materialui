import { Datagrid, TopToolbar, CreateButton,useRedirect, List, ReferenceManyCount, TextField, EditButton } from "react-admin"
import { useParams } from "react-router-dom";

const ListActions = () => (
    <TopToolbar>
        <CreateButton />
    </TopToolbar>
);
const CategoryList = () => {
    const { mycode } = useParams();
    console.log('code is: ', mycode);
    const redirect = useRedirect();
    return (
        <List  actions={<ListActions />} resource="t_prod_category">
            <Datagrid>
                <TextField source='id' />
                <TextField source='code' />
                <TextField source='category_name' />
                <ReferenceManyCount
                    label="style"
                    reference="t_prod_style"
                    target='category_id'
                    link
                />
                  <EditButton />
            </Datagrid>
        </List>
    )
}

export default CategoryList;