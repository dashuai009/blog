import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from '@mui/material/Link';
import Masonry from '@mui/lab/Masonry';
import EditIcon from '@mui/icons-material/Edit';
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import BottomAction from "@/components/BottomAction";
import {CardHeader} from "@mui/material";

interface ListInfos {
    status: 'yes' | 'no',
    msg: string,
    data: any
}

export default function BasicCard({status, msg, data}: ListInfos) {
    const router = useRouter();
    return (
        <Box sx={{margin: "10px auto"}}>
            <Masonry
                spacing={2.5}
                defaultHeight={300}
                defaultColumns={4}
                defaultSpacing={1}>
                {
                    data.map((item: any) => (
                        <Card key={item.page_id} sx={{minWidth: 275, maxWidth: 350, borderRadius: 3.9}}>
                            {/*<CardHeader*/}
                            {/*    title={item.title}*/}
                            {/*    subheader={item.author}*/}
                            {/*>*/}

                            {/*</CardHeader>*/}
                            <CardContent>
                                {/*<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>*/}
                                {/*    {item.title}*/}
                                {/*</Typography>*/}
                                <Link variant="h5" component="div" onClick={(e) => {
                                    router.push(`/pages/${item.page_id}/${encodeURIComponent(item.title)}`)
                                }} underline="none" color={"black"}>
                                    {item.title}
                                </Link>

                                <Typography sx={{mb: 1.5}}>
                                    {item.author}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.content}
                                </Typography>
                            </CardContent>
                            <Box sx={{mb: 0.5}}>
                                <BottomAction blog_data={item}></BottomAction>
                            </Box>
                        </Card>
                    ))
                }
            </Masonry>
        </Box>

    );
}

// λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
// ○  (Static)  automatically rendered as static HTML (uses no initial props)
// ●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
// (ISR)     incremental static regeneration (uses revalidate in getStaticProps)

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/list`);
    if (!res.ok) {
        return {
            props: {
                status: "no",
                msg: "api/list failed",
                data: []
            },
            revalidate: 10
        }
    }
    const {status, msg, data} = await res.json();

    if (status == 'yes') {
        // If the request was successful, return the posts
        // and revalidate every 10 seconds.
        return {
            props: {
                status: status,
                msg: msg,
                data: data
            },
            revalidate: 10
        }
    } else {
        // Pass data to the page via props
        return {
            props: {status: status, msg: msg, data: []},
            revalidate: 10
        }
    }
}