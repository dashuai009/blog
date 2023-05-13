import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import css from './index.module.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from '@mui/material/Link';
import Masonry from '@mui/lab/Masonry';
import EditIcon from '@mui/icons-material/Edit';
import {useRouter} from "next/router";

interface ListInfos {
    status: 'yes' | 'no',
    msg: string,
    data: any
}

export default function BasicCard({status, msg, data}: ListInfos) {
    const router = useRouter();
    return (
        <div className={css.container}>
            <Masonry columns={4} spacing={2}>
                {
                    data.map((item: any) => (
                        <Card key={item.page_id} sx={{minWidth: 275, maxWidth: 350}}>
                            <CardContent>
                                {/*<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>*/}
                                {/*    {item.title}*/}
                                {/*</Typography>*/}
                                <Link variant="h5" component="div" onClick={(e) => {
                                    router.push(`/pages/${item.page_id}/${encodeURIComponent(item.title)}`)
                                }} underline="hover">
                                    {item.title}
                                </Link>

                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    {item.anchor}
                                </Typography>
                                <Typography variant="body2">
                                    {item.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color={"warning"}> <FavoriteBorderIcon/> {item.likes}</Button>
                                <Button size="small"> <VisibilityIcon/>{item.views}</Button>
                                <Button size="small">
                                    <EditIcon/>{(new Date(item.created_at)).toLocaleDateString("en-US")}</Button>
                            </CardActions>
                        </Card>
                    ))
                }
            </Masonry>
        </div>

    );
}


export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/list`);
    const {status, msg, data} = await res.json();

    if (status == 'yes') {
        return {
            props: {
                status: status,
                msg: msg,
                data: data
            }
        }
    } else {
        // Pass data to the page via props
        return {
            props: {status: status, msg: msg, data: null}
        }
    }
}