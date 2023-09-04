# react-admin-materialui
后端：postgrest数据库
前端：react-admin+material ui


# react-admin-version 
历史版本

# react-admin-new 
最新版本

-----
# 前言

> 大家好 我是歌谣 今天继续给大家带来新的技术栈的实践利用的原理是我们的react-admin 创建一个项目 文件在react-admin-version

# 技术栈

> postgrest数据库  前端react-admin materiel ui+作为组件库

# 数据库部署

> 本次的数据库是利用腾讯云创建一个postgrest数据库 进行数据库的直连操作即可

# 数据库设计部分(ER图)
![在这里插入图片描述](https://img-blog.csdnimg.cn/1b1af7d4096f48dcafae797a77894eb8.png)

> 建立学校 班级和学生的关系

# 配置文件

```
db-uri = "postgres://datames:xxxx@xxxxx/datames"
db-schema = "public"
#db-schema = "clouddb"
#db-anon-role = "yjg"
#db-anon-role = "anon"
db-anon-role = "datames"
#server-host = "0.0.0.0"
server-host = "localhost"
server-port = 4001
#server-port = 3001

#jwt-secret="reallyreallyreallyreallyverysafe"
```

> 注意要开启云服务器的监听端口 等信息

# 后台启动
![在这里插入图片描述](https://img-blog.csdnimg.cn/0832f712236a4db0a0bf4fdd1b1d5973.png)

# 前端部分局部代码

```
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
```

# 增加

```
import * as React from 'react';
import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, UpdateParams, useDataProvider, useResourceContext } from 'react-admin';
import { useNavigate } from "react-router-dom";
export const SchoolCreate = (props: any) => {
    const navigate = useNavigate()
    const onSuccess = (data: any) => {
        navigate(-1)
    };
    return (
        <Create mutationOptions={{ onSuccess }}
        >
            <SimpleForm>
                <TextInput source="school_name" />
            </SimpleForm>
        </Create>
    )

}
```

# 编辑

```
import * as React from 'react';
import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, Edit, UpdateParams, useDataProvider, useResourceContext } from 'react-admin';
import { useNavigate } from "react-router-dom";
export const SchoolEdit = (props: any) => {
    const navigate = useNavigate()
    const dataprovider = useDataProvider();
    const resource = useResourceContext();
    const onSuccess = (data: any) => {
        const { id, ...res } = data;
        const params: UpdateParams = { id: id, data: res } as UpdateParams;
        dataprovider.update(resource, params);
        navigate(-1)
    };
    return (
        <Edit mutationOptions={{ onSuccess }}
        >
            <SimpleForm>
                <TextInput source="school_name" />
            </SimpleForm>
        </Edit>
    )

}
```

# 查看

```
import { Box, Button, Typography } from "@mui/material";
import { Datagrid, EditButton, List, TextField, ReferenceManyCount } from "react-admin"
import { useNavigate, useParams } from "react-router-dom";
const Empty = () => {
    const { id: plant_id } = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/t_geyao_school/create`);
    }

    return (
        <Box textAlign={'center'} m={1}>
            <Typography variant="h4" paragraph>
                当前没有学校
            </Typography>
            <Typography variant="body1">
                新加入一个学校信息
            </Typography>
            <Button onClick={handleClick}>新建学校</Button>
        </Box>
    )
}
const SchoolList = () => {
    return (
        <List empty={<Empty />} exporter={false} hasCreate={true} resource="t_geyao_school"
        >
            <Datagrid >
              
                <TextField source='id' />
                <TextField source='school_name' />
                <EditButton></EditButton>
            </Datagrid>
        </List>
    )
}
export default SchoolList
```

# 运行结果
## 新增
![在这里插入图片描述](https://img-blog.csdnimg.cn/a25f4dc2e595415f952b858c371027a4.png)
## 查看
![在这里插入图片描述](https://img-blog.csdnimg.cn/a6ed0156ab7f4718b59be48e8f25b99c.png)
## 编辑
![在这里插入图片描述](https://img-blog.csdnimg.cn/8b6c1cb00be74cc48a35289efd147797.png)

# 小结

> 对于常规的单表操作 使用当前技术栈还是相当的快捷方便 我是歌谣 最好的种树是十年前 其次是现在
