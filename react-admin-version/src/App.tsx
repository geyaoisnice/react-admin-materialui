import React, { useEffect, useState, useMemo } from 'react'
import postgrestRestProvider, { IDataProviderConfig, defaultPrimaryKeys, defaultSchema } from '@raphiniert/ra-data-postgrest';
import { Admin, CustomRoutes, Layout, LayoutProps, ListGuesser, Resource, fetchUtils, useCreatePath } from 'react-admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { Menu } from "antd"
import axios from 'axios';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import chineseMessages from '@haxqer/ra-language-chinese';
import SchoolList from './SchoolManage/schoollist';
import { SchoolCreate } from './SchoolManage/schoolcreate';
import { SchoolEdit } from './SchoolManage/schooledit';
import ClassList from './ClassManage/classlist';
import { ClassCreate } from './ClassManage/classcreate';
import { TeacherAdd } from './TeacherMange/TeacherAdd';
import TeacherList from './TeacherMange/TeacherList';
const i18nProvider = polyglotI18nProvider(() => chineseMessages, 'zh');
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
  getStyleTree: (parentTable: string, childTable: string) => axios.get(`/postgrest/${parentTable}?select=id,category_name,code,${childTable}(id,style_name,code)&tenant_id=eq.1`)
    .then((res: any) => {
      return res.data;
    }
    )
}
export interface IMenuItem {
  label: React.ReactNode;
  title?: string;
  path?: string;
  key: string;
  icon?: React.ReactNode;
  children?: IMenuItem[];
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
const App = (props: any) => {
  const [appViewHeight, setAppViewHeight] = useState<string>('calc(100vh - 96px');
  useEffect(() => {
    if (!window.__RICHON_SHELL__) {
      setAppViewHeight('100vh');
    }
  }, []);
  useEffect(() => {
    const handleAppViewHeight = (e: any) => {
      if (typeof e.data === 'object') {
        if (e.data.appHeight !== undefined) {
          console.log(e.data.appHeight, "appHeight")
          const heigth = e.data.appHeight;
          setAppViewHeight(heigth);
        }
      }
    };
    window.addEventListener('message', handleAppViewHeight);
    return () => window.removeEventListener('message', handleAppViewHeight);
  }, []);
  const items = useMemo<IMenuItem[]>(() => {

    let menuItems: IMenuItem[] = new Array<IMenuItem>();

    let item: IMenuItem = {
      key: 'home',
      label: '歌谣学校管理系统',
      children: new Array<IMenuItem>(),
    }
    let schoolItem: IMenuItem = {
      key: 'schgeyao',
      label: <Link to='/schgeyao'>学校管理</Link>,
      path: '/schgeyao'
    }
    let classItem: IMenuItem = {
      key: 'classgeyao',
      label: <Link to='/classgeyao'>班级管理</Link>,
      path: '/classgeyao'
    }
    let teacherItem: IMenuItem = {
      key: 'teachergeyao',
      label: <Link to='/teachergeyao'>教师管理</Link>,
      path: '/teachergeyao'
    }
    item.children!.push(schoolItem);
    item.children!.push(classItem)
    item.children!.push(teacherItem);;
    menuItems.push(item);
    return menuItems;
  }, [])
  return (
    <Grid style={{ height: `${appViewHeight}`, margin: 0, padding: 0, display: "flex" }}>
      <BrowserRouter basename={window.__RICHON_SHELL__ ? 'prodmanager' : ''}>
        <div>
          {
            !window.__RICHON_SHELL__ ?
              <div style={{ width: "200px" }}>
                <Menu
                  mode='inline'
                  theme='dark'
                  inlineCollapsed={false}
                  items={items}
                />
              </div>
              : null
          }
        </div>

        <div style={{ flexGrow: 1 }}>
          <Admin
            dataProvider={dataProvider}
            layout={appLayout}
            i18nProvider={i18nProvider}
          >

            <Resource name='t_geyao_school' recordRepresentation="school_name" create={SchoolCreate} list={ListGuesser} edit={SchoolEdit} />
            <Resource name='t_geyao_class' recordRepresentation="class_name" create={ClassCreate} list={ListGuesser} />
            <Resource name='t_geyao_teacher' create={TeacherAdd} list={ListGuesser} />
            <CustomRoutes>
              <Route path="schgeyao/*" element={<SchoolList />} />
              <Route path="classgeyao/*" element={<ClassList />} />
              <Route path="teachergeyao/*" element={<TeacherList />} />
            </CustomRoutes>
          </Admin>
        </div>
      </BrowserRouter>
    </Grid>
  )
}
export default App