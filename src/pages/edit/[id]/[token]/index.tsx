import {useRouter} from 'next/router'
import React from "react";
import BlogEditor from "@/lexical-playground/src/BlogEditor";
import {PropsInterface, TextType} from "@/pages/api/blog-interface";
import {check_edit_token} from "@/pages/api/check-token";
import MarkdownOnlyEditor from "@/markdown-only/Editor";

export default function PostPage({status, msg, blog}: PropsInterface) {
    const router = useRouter()
    if (status == 'no') {// token错误等
        return (
            <>
                <h1>msg: {msg}</h1>
            </>
        )
    }
    const id = router.query.id as string;
    const token = router.query.token as string;
    // console.log(`data = ${blog}`)

    if (blog!.text_type == TextType.LEXICAL_RICHTEXT) {
        return (
            <>
                <h1>id: {id}</h1>
                <h1>token: {token}</h1>
                <BlogEditor editMode={true} contentJson={blog!.text}/>
            </>
        )
    } else if(blog!.text_type == TextType.MARKDOWN){
        return (
            <>
                <h1>title: {blog!.title}</h1>
                <h1>type: {blog!.text_type}</h1>
                <MarkdownOnlyEditor markdownText={blog!.text}/>
            </>
        )
    } else {
        return (
            <>
            <h1>unknown!</h1>
            </>
        )
    }
}


// This gets called on every request
export async function getServerSideProps({params}: any): Promise<{ props: PropsInterface }> {
    if (!check_edit_token(params.token)) {
        return {
            props: {
                status: 'no',
                msg: 'token error',
                blog: null
            }
        }
    }

    // Fetch data from external API
    const id = params.id as string;

    // console.log(`getServerSideProps server id = ${id}`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pages/${id}`);
    const data = await res.json();
    // console.log("get_ser res = ", data)

    // Pass data to the page via props
    return {
        props: data
    }
}