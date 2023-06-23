import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import * as React from "react";
import {useState} from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";


export default function BottomAction({blog_data}: any) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(blog_data.likes as number);
    const onClickLikes = () => {
        if(liked){
            setLikeCount(likeCount  - 1);
        } else{
            setLikeCount(likeCount + 1)
        }
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/count/like/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                page_id: blog_data?.page_id,
                likes: !liked
            })
        });
        setLiked(!liked);
    }
    return <>
        <Box sx={{display: "flex", justifyContent: 'space-between'}}>
            <Button size="small" color={"warning"} onClick={onClickLikes}>
                {liked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                {likeCount}
            </Button>
            <Button size="small"> <VisibilityIcon/>{blog_data.views}</Button>
            <Button size="small" color={"inherit"}>
                <EditIcon/>{(new Date(blog_data.created_at)).toLocaleDateString("en-US")}</Button>
        </Box>
    </>
}