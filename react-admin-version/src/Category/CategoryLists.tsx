/* 品类筛选多个款式 */
import { useEffect, useState } from "react";
import { Datagrid, useListContext, ShowButton, BulkDeleteButton, TextField, EditButton, List } from "react-admin"
import { useParams } from "react-router-dom";

interface ICategoryLists {
    handleUpdateList: () => void,
}
const CategoryChild = (props:any) => {
    const { data } = useListContext();
    useEffect(() => {
        props.handleSubscribe && props.handleSubscribe()
    }, [data]);
    return (
        <Datagrid bulkActionButtons={<BulkDeleteButton mutationMode="pessimistic"></BulkDeleteButton>} rowClick='edit'>
            <TextField source='code' />
            <TextField source='style_name' />
            <EditButton></EditButton>
            <ShowButton></ShowButton>
        </Datagrid>
    )
}
const CategoryLists = (props: ICategoryLists) => {
    const { params: category_id } = useParams()
    const handleUpdateList=()=>{
        props.handleUpdateList && props.handleUpdateList()
    }
    return (
        <List exporter={false} filter={{ category_id }} resource="t_prod_style">
            <CategoryChild handleSubscribe={handleUpdateList}></CategoryChild>
        </List>
    )
}
export default CategoryLists;