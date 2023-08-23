/* 品类筛选多个款式 */
import { useEffect } from "react";
import { Datagrid, ShowButton,ReferenceManyCount,useListContext, BulkDeleteButton, TextField, EditButton, List } from "react-admin"
import { useParams } from "react-router-dom";

interface ICategoryLists {
    handleUpdateList: () => void,
}
const CategoryTitleChild = (props:any) => {
    const { data } = useListContext();
    useEffect(() => {
        props.handleSubscribe && props.handleSubscribe()
    }, [data]);
    return (
        <Datagrid bulkActionButtons={<BulkDeleteButton mutationMode="pessimistic"></BulkDeleteButton>} rowClick='edit'>
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
              <ShowButton/>
        </Datagrid>
    )
}
const CatagoryTitle = (props: ICategoryLists) => {
    const { data } = useListContext();
    const handleUpdateList=()=>{
        props.handleUpdateList && props.handleUpdateList()
    }
    return (
        <List exporter={false}  resource="t_prod_category">
          <CategoryTitleChild handleSubscribe={handleUpdateList}></CategoryTitleChild>
        </List>
    )
}
export default CatagoryTitle;