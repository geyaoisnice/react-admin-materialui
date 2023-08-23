

import React, { useState } from "react"
import { Admin, CustomRoutes, Layout, LayoutProps, Resource,  fetchUtils, useDataProvider } from "react-admin";
import postgrestRestProvider, { IDataProviderConfig, defaultPrimaryKeys, defaultSchema } from '@raphiniert/ra-data-postgrest';
import chineseMessages from '@haxqer/ra-language-chinese';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import MaterialTypeList from "./MaterialTypeList";
import { MaterialTypeAdd } from "./MaterialTypeAdd";
import { MaterialTypeEdit } from "./MaterialTypeEdit";
const i18nProvider = polyglotI18nProvider(() => chineseMessages, 'zh');
export interface ICategoryList {
    id: number,
    category_name: string
    t_prod_style: IProdList[]
}
export interface IProdList {
    id: number,
    style_name: string
}
export interface ICategory {
    categoryId: number,
}
const config: IDataProviderConfig = {
    apiUrl: '/postgrest',
    httpClient: fetchUtils.fetchJson,
    defaultListOp: 'eq',
    primaryKeys: defaultPrimaryKeys,
    schema: defaultSchema
}
const baseDataProvider = postgrestRestProvider(config);
const dataProvider = {
    ...baseDataProvider,
    //可以在这里添加越过dataProvider的数据访问
}
const appBar = (props: any) => {
    return (
        <></>
    )
}
const useAppMenu = () => {
    return (<></>)
}
const mySidebar = () => {
    return (<></>)
}
const appLayout = (props: LayoutProps) => {
    return (
        <Layout
            sx={
                {
                    '& .RaLayout-appFrame': {
                        minHeight: '100%',
                        height: '100%',
                        margin: 0,
                        padding: 0
                    },
                    '& .RaLayout-content:': { marginTop: 0, marginBottom: 0, padding: 0, minHeight: '100%', height: '100%' },
                    '& .RaLayout-contentWithSidebar': { margin: 0, padding: 0, minHeight: '100%', height: '100%' },
                    minHeight: '100%',
                    height: '100%',
                    margin: 0,
                    padding: 0,
                }
            }
            {...props}
            appBar={appBar}
            menu={useAppMenu}
            sidebar={mySidebar}
        />
    )
}
export var UserContext: React.Context<{}> = React.createContext({})
const MaterialTypeLayout = () => {
    const dataProviders = useDataProvider();
    const [styleConext, setStyleConext] = useState<ICategory>({ categoryId: 0 });
    return (
        <UserContext.Provider value={styleConext}>
            <Admin
                dataProvider={dataProvider}
                basename='/materialtype'
                layout={appLayout}
                i18nProvider={i18nProvider}
            >
                <Resource name='t_base_materiel_type' recordRepresentation="name" list={MaterialTypeList} create={MaterialTypeAdd} edit={MaterialTypeEdit} />
                <CustomRoutes>
                </CustomRoutes>
            </Admin>
        </UserContext.Provider>
    )
}

export default MaterialTypeLayout;