import { useMemo } from "react";
import { GetListResult, Identifier, useDataProvider } from "react-admin";
import { UseQueryOptions, UseQueryResult, useQuery, useQueryClient } from "react-query";

export interface TreeRecord {
    id: Identifier;
    [key: string]: any;
    children: Record<string, any>[];
}
export type UseGetTreeHookValue<RecordType extends TreeRecord = any> = UseQueryResult<RecordType[], Error>;
const UseGetTree = <RecordType extends TreeRecord = any>(
    parentTable: string,
    childTable: string,
    refleshFlag: boolean,
    options?: UseQueryOptions<GetListResult<RecordType>, Error>
): UseGetTreeHookValue<RecordType> => {
    const dataProvider = useDataProvider();
    const queryClient = useQueryClient();
    const result = useQuery<
        GetListResult<RecordType>,
        Error,
        GetListResult<RecordType>
    >(
        [parentTable, childTable, 'getTree', refleshFlag],
        () =>
            dataProvider
            .getStyleTree(parentTable, childTable)
            .then((data: any)=>(
                {data}
            )),
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

export default UseGetTree;