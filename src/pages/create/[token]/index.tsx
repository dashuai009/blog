import {useRouter} from 'next/router'
import Link from 'next/link'
import {useEffect, useState} from "react";

import React from 'react';
import {BlogInterface, TextType} from "@/pages/api/blog-interface";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormControl, FormLabel, MenuItem} from '@mui/material';

export default function Index() {
    const router = useRouter()
    let token = router.query.token;
    const [status, setStatus] = useState(0);//0 loading 1 error 2 success
    const [title, setTitle] = useState("empty");
    const [content, setContent] = useState("empty");
    const [tags, setTags] = useState([] as string[]);
    const [author, setAuthor] = useState("dashuai009");
    const [textType, setTextType] = useState(TextType.LEXICAL_RICHTEXT);


    useEffect(() => {
        if (!token) return;
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/check_edit_token/${token}`)
            .then((res) => res.json())
            .then((res) => {
                // console.log(`check_edit_token result = ${res}`)
                if (res.status == 'yes') {
                    setStatus(2);
                    // setId(res.id);
                } else {
                    setStatus(1)
                }
            })
    }, [status, token])

    if (status == 0) {
        return (
            <>
                <h1> Loading ...</h1>
            </>
        )
    } else if (status == 1) {
        return (
            <>
                <h1>token error ...</h1>
            </>
        )
    }
    let data = new BlogInterface();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        data.title = title;
        data.tags = tags;
        data.content = content;
        data.text = "";
        data.author = author;
        data.created_at = new Date();
        data.updated_at = new Date();
        data.text_type = textType;
        data.views = data.likes = 0;
        data.text = "";


        // console.log("insert new", data);
        if(!token){
            // console.log("token is empty")
        }
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/create/${token}`, {
            method: 'POST',
            body: JSON.stringify({
                "token": token,
                "page_info": data
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                // console.log("result = ", res)
                if (res.status == 'yes') {
                    router.push(`/edit/${res.page_id}/${token}`)
                } else {
                    // console.log(`create new page error: ${res}`);
                }
            })
    }
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="page-title"
                label="Title"
                onChange={e => setTitle(e.target.value)}
                variant="standard"/>
            <TextField
                id="page-author"
                label="Author"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                variant="standard"/>
            <TextField
                id="page-tags"
                label="Tags"
                onChange={e => setTags([e.target.value])}
                variant="standard"/>
            <TextField
                id="page-content"
                label="Content"
                onChange={e => setContent(e.target.value)}
                variant="standard"/>
            <TextField
                id="page-text-type"
                select
                label="Select"
                helperText="Please select your text_type"
                defaultValue={TextType.LEXICAL_RICHTEXT}
                onChange={e => setTextType(e.target.value as TextType)}
            >
                {Object.values(TextType).map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </Box>
    )

}
