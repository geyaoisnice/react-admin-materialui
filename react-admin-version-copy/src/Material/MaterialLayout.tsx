

import React from "react"
import { Admin, CustomRoutes, Datagrid, Layout, LayoutProps, ListGuesser, List as ListM, EditButton, Resource, TextField, fetchUtils, useDataProvider, useListContext, useRefresh, ShowGuesser } from "react-admin";
import postgrestRestProvider, { IDataProviderConfig, defaultPrimaryKeys, defaultSchema } from '@raphiniert/ra-data-postgrest';
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import chineseMessages from '@haxqer/ra-language-chinese';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import MaterialList from "./MaterialList";
import { MaterialAdd } from "./MaterialAdd";
import { MaterialEdit } from "./MaterialEdit";

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
const MaterialLayout = () => {
  const dataProviders = useDataProvider();
  const [styleConext, setStyleConext] = useState<ICategory>({ categoryId: 0 });
  return (
    <UserContext.Provider value={styleConext}>
      <Admin
        dataProvider={dataProvider}
        basename='/materiallist'
        layout={appLayout}
        i18nProvider={i18nProvider}
      >
        <Resource name='t_base_materiel' recordRepresentation="name" list={MaterialList} create={MaterialAdd} edit={MaterialEdit} />
        <Resource name='t_base_materiel_type' recordRepresentation="name"/>
        <CustomRoutes>
        </CustomRoutes>
      </Admin>
    </UserContext.Provider>
  )
}
export default MaterialLayout;