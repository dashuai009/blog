import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Masonry from "@mui/lab/Masonry";

import Link from '@mui/material/Link';
//
// const inter = Inter({subsets: ['latin']})
import * as React from 'react';
import Box from '@mui/material/Box';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import {useState} from "react";
import {useRouter} from "next/router";

const data = [
    {icon: <People/>, label: 'katex-wasm', herf: 'https://github.com/dashuai009/katex-wasm'},
    {icon: <Dns/>, label: 'cpp20學習記錄', herf: 'https://github.com/dashuai009/cpp20_demo'},
    // { icon: <PermMedia />, label: 'Storage', herf:'https://github.com/dashuai009/katex-wasm'  },
    // { icon: <Public />, label: 'Hosting', herf:'https://github.com/dashuai009/katex-wasm'  },
];

const FireNav = styled(List)<{ component?: React.ElementType }>({
    '& .MuiListItemButton-root': {
        paddingLeft: 24,
        paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    },
});

export default function Home(props: any) {
    const router = useRouter();
    const [open, setOpen] = useState(true);
    return (
        <>
            <main>
                <Masonry columns={2} spacing={2} sx={{margin: "30px auto"}}>
                    {/*github*/}
                    <Paper
                        sx={{
                            pb: open ? 2 : 0,
                        }}
                    >
                        <ListItemButton
                            alignItems="flex-start"
                            onClick={() => setOpen(!open)}
                            sx={{
                                px: 3,
                                pt: 2.5,
                                pb: open ? 0 : 2.5,
                                '&:hover, &:focus': {'& svg': {opacity: open ? 1 : 0}},
                            }}
                        >
                            <ListItemText
                                primary="👋Github"
                                primaryTypographyProps={{
                                    fontSize: 15,
                                    fontWeight: 'medium',
                                    lineHeight: '20px',
                                    mb: '2px',
                                }}
                                secondary={data.map(item => item.label).join("  ")}
                                secondaryTypographyProps={{
                                    noWrap: true,
                                    fontSize: 12,
                                    lineHeight: '16px',
                                    color: open ? 'rgba(0,0,0,0)' : 'rgba(55,25,25,0.5)',
                                }}
                                sx={{my: 0}}
                            />
                            <KeyboardArrowDown
                                sx={{
                                    mr: -1,
                                    opacity: 0,
                                    transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                                    transition: '0.2s',
                                }}
                            />
                        </ListItemButton>
                        {open &&
                            data.map((item) => (
                                <ListItemButton
                                    key={item.label}
                                    sx={{py: 0, minHeight: 32}}
                                    onClick={(e) => {
                                        router.push(item.herf)
                                    }}
                                >
                                    <ListItemIcon sx={{color: 'inherit'}}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.label}
                                        primaryTypographyProps={{fontSize: 14, fontWeight: 'medium'}}
                                    > </ListItemText>


                                </ListItemButton>
                            ))}
                    </Paper>
                    <Paper>
                        Email: dashuai009@petalmail.com （不常用)
                    </Paper>

                </Masonry>

                <div className="app-footer">
                    dashuai<a href="https://beian.miit.gov.cn" style={{color: "#939393"}}>{"鲁ICP备2021005921号"}</a>
                    <div style={{width: 300, margin: "0 auto", padding: "5px 0"}}>
                        <a target="_blank"
                           href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37131202371426"
                           style={{display: "inline-block", textDecoration: "none", height: 20, lineHeight: 20}}>
                            <img src="assets/备案图标.png" style={{float: "left"}}/>
                            <p style={{
                                float: "left",
                                height: 20,
                                lineHeight: 20,
                                margin: "0px 0px 0px 5px",
                                color: "#939393"
                            }}>{"鲁公网安备37131202371426号"}</p>
                        </a>
                    </div>
                </div>
            </main>
        </>
    )
}
