import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper, ThemeProvider, createTheme } from "@mui/material"
import React, { useState, ElementType } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import styled from "@emotion/styled";
import _ from 'lodash';
import useEvent from "react-use-event-hook";
import { INavItem } from "../../App";

const NavList = styled(List)<{comopnent?: ElementType}>({
    '& .MuiListItemButton-root': {
        paddingLeft: 24,
        paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 24,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    }
})

export interface INavListBarProps {
    items: INavItem[];
}
const NavListBar: React.FC<INavListBarProps> = (props) => {
    const {items} = props;

    const [navItems, setNavItems] = useState<INavItem[]>(items);

    const handleItemClick = useEvent((id: number) => {
        let temp = _.cloneDeep(navItems);

        temp.forEach(it => {
            if(it.id === id) {
                it.open = !it.open;
            }
        });

        setNavItems(temp);
    });

    return(
        <Box sx = {{display: 'flex'}}>
            <ThemeProvider
                theme = {createTheme({
                    components: {
                        MuiListItemButton: {
                            defaultProps: {
                                disableTouchRipple: true,
                            },
                        },
                    },
                    palette: {
                        mode: 'dark',
                        primary: {main: 'rgb(102, 157, 246)'},
                        background: {paper: 'rgb(5, 30, 52)'},
                    }
                })}
            >
                <Paper elevation={8} sx = {{maxWidth: 200, minWidth: 200, height: '100vh'}}>
                    <NavList comopnent={'nav'} disablePadding>
                        {navItems.map((item) => {
                            return(
                                <Box
                                    key = {item.id}
                                    sx = {{
                                        bgcolor: item.open? 'rgba(71, 98, 130, 0.2)': null,
                                        pb: item.open? 2: 0,
                                    }}
                                >
                                    <ListItemButton
                                        alignItems="flex-start"
                                        onClick={() => handleItemClick(item.id)}
                                        sx = {{
                                            px: 3,
                                            pt: 2.5,
                                            pb: item.open? 0: 2.5,
                                            '&:hover, &:focus': {'& svg': {opacity: item.open? 1: 0}},
                                        }}
                                    >
                                        <ListItemText
                                            primary = {item.title}
                                            primaryTypographyProps={{
                                                fontSize: 15,
                                                fontWeight: 'medium',
                                                lineHeight: '20px',
                                                mb: '2px'
                                            }}
                                            secondary = '点击后展开导航列表'
                                            secondaryTypographyProps={{
                                                noWrap: true,
                                                fontSize: 12,
                                                lineHeight: '16px',
                                                color: item.open? 'rgba(0, 0, 0, 0)': 'rgba(255, 255, 255, 0.5)',
                                            }}
                                            sx = {{my: 0}}
                                        />
                                        <KeyboardArrowDown
                                            sx = {{
                                                mr: -1,
                                                opacity: 0,
                                                transform: item.open? 'rotate(-180deg)': 'rotate(0)',
                                                transition: '0.4s',
                                            }}
                                        />
                                    </ListItemButton>
                                    {
                                        item.open && item.children.map((it) => (
                                            <ListItemButton
                                                key = {it.path}
                                                sx = {{py: 0, marginLeft: '8px', minHeight: 32, color: 'rgba(255, 255, 255, .8'}}
                                            >
                                                <ListItemIcon sx = {{color: 'inherit'}}>
                                                    {it.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary = {it.label}
                                                    primaryTypographyProps={{fontSize: 14, fontWeight: 'medium'}}
                                                />
                                            </ListItemButton>
                                        ))
                                    }
                                </Box>
                            )})
                        }
                    </NavList>
                </Paper>
            </ThemeProvider>
        </Box>
    )
}

export default NavListBar;