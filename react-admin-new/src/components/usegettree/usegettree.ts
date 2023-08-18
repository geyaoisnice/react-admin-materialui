import { useMemo } from "react";
import { GetListResult, Identifier, useDataProvider } from "react-admin";
import { UseQueryOptions, UseQueryResult, useQuery, useQueryClient } from "react-query";

export interface TreeRecord {
    id: Identifier;
    [key: string]: any;
    children: Record<string, any>[];
}

export type UseGetTreeHookValue<RecordType extends TreeRecord = any> = UseQueryResult<RecordType[], Error>;

/**
 * 通过dataProvider查询树形结构，访问接口使用postgrest格式，并且添加到dataProvider中，如下图：
 *     getStyleTree: (parentTable: string, childTable: string) => axios.get(
        `/api/${parentTable}?select=id,category_name,code,children:${childTable}(id,style_name,code)&tenant_id=eq.1`)
      .then((res: any) => {
        return res.data;
      }
    )
 * 以上postgrest格式按照数据库中表的实际结构调整，为了适应前段组件的应用，可以使用postgrest的rename重命名语法，例如上例中的childeren
 * @param parentTable，树形结构的父表
 * @param childTable ，树形结构的字表
 * @param refreshFlag ，刷新标志
 * @param options ，可选项
 * @returns 
 */
const useGetTree = <RecordType extends TreeRecord = any>(
    parentTable: string,
    childTable: string,
    options?: UseQueryOptions<GetListResult<RecordType>, Error>
): UseGetTreeHookValue<RecordType> => {
    const dataProvider = useDataProvider();
    const queryClient = useQueryClient();
    const result = useQuery<
        GetListResult<RecordType>,
        Error,
        GetListResult<RecordType>
    >(
        [parentTable, childTable, 'getTree'],  //refreshFlag用于重新查询
        () =>
            dataProvider
            .getTree(parentTable, childTable)
            .then((data: any)=>{
                return(
                    {data}
                );
            }),
        {
            ...options,
            onSuccess: value => {
                const {data} = value;

                data.forEach(record => {
                    queryClient.setQueryData(
                        [parentTable, childTable, 'getOne', {id: String(record.id)}],
                        oldRecord => oldRecord ?? record
                    )
                });
            }
        },
    );

    return useMemo(
        () => 
            result.data ? 
                {
                    ...result,
                    data: result.data?.data,
                    total: result.data?.total,
                }
                : result,
            [result]
    ) as UseGetTreeHookValue<RecordType>; 
}

export default useGetTree;