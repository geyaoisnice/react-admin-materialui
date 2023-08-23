import { AppBar, Box, Card, CardContent, CardHeader, Container, Divider, Grid, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import { Labeled } from 'react-admin';
interface IItem {
    style_name?: string,
    code?: string,
    create_date?: string
}
interface IMaterialStyleTitle {
    styleRecord?: IItem
}
export const MaterialStyleTitle = (props: IMaterialStyleTitle) => {
    const { styleRecord } = props
    return (
        <div>
            <Box>
                <CardContent>
                    <Divider>款式信息</Divider>
                </CardContent>
                <CardContent>
                <Grid container spacing={1}>
                <Grid item xs ={6} sm = {16} md = {3} >
                    <Labeled source='款式'>
                        <ListItemText primary={styleRecord?.style_name} />
                    </Labeled >
                    </Grid>
                    <Grid item xs ={6} sm = {16} md = {3} >
                    <Labeled source='编号'>
                        <ListItemText primary={styleRecord?.code}/>
                    </Labeled>
                    </Grid>
                    <Grid item xs ={6} sm = {16} md = {3} >
                    <Labeled source='创建日期'>
                        <ListItemText primary={styleRecord?.create_date} />
                    </Labeled>
                    </Grid>
                    </Grid>
                </CardContent >
            </Box>
        </div>
    )

}