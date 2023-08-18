import { RemoveRedEye } from '@mui/icons-material';
import { BulkDeleteButton, Button, CreateButton, Datagrid, Identifier, List, RaRecord, ReferenceManyCount, TextField, TopToolbar, useBasename, useRecordContext, useRedirect } from 'react-admin';
import { Link } from 'react-router-dom';

const ListActions = () => {
    console.log(useBasename,"useBasename is")
    const url = useBasename() + '/product/categoryCreate';
    return (
        <TopToolbar>
            <CreateButton
                to={url}
            />
        </TopToolbar>
    )
}

const ShowRecordButton = () => {
    const record = useRecordContext();
    return (
        <Button
            component={Link}
            to={`/product/categoryShow/${record.id}/show`}
            onClick={(e) => e.stopPropagation()}
            label='查看'
        >
            {<RemoveRedEye />}
        </Button>
    )
}

const CategoryList = () => {
    let url = useBasename() + '/product/categoryEdit';
    const redirect = useRedirect();

    const handleRowClick = (id: Identifier, resource: string, record: RaRecord): false => {
        url = url + `/${id}`;
        redirect(url);
        return false;
    }

    return (
        <List resource='t_prod_category'
            exporter={false}
            hasCreate
            sx={{ width: '100%' }}
            actions={<ListActions />}
        >
            <Datagrid sx={{ width: '100%' }}
                bulkActionButtons={<BulkDeleteButton mutationMode='pessimistic' />}
                rowClick={handleRowClick}
            >
                <TextField source='id' />
                <TextField source='code' />
                <TextField source='category_name' />
                <ReferenceManyCount
                    label="style"
                    reference="t_prod_style"
                    target='category_id'
                    link
                />
                <ShowRecordButton />
            </Datagrid>
        </List>
    )
}

export default CategoryList;