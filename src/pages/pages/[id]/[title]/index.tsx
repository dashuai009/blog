import {useRouter} from 'next/router'
import {PropsInterface} from "@/pages/api/blog-interface";
import css from './index.module.css';
import {BlogRender} from "@/non-pages/render";

export default function PostPage({status, msg, blog}: PropsInterface) {
    const router = useRouter()
    const id = router.query.id as string;
    const title = router.query.title as string;
    // console.log(status, msg, blog)

    return (
        <>
            <h1>id: {id}</h1>
            <h1>title: {title}</h1>
            <h1>type: {blog?.text_type}</h1>
            {/*<div>{blog?.text}</div>*/}
            {/*<div>{msg}</div>*/}
            <div className={css.editorContainer} dangerouslySetInnerHTML={{__html: msg}}/>
            {/*<BlogEditor editMode={false} contentJson={data.blog.text}/>*/}
        </>
    )
}

// This gets called on every request
export async function getServerSideProps({params}: any) {
    // Fetch data from external API
    const id = params.id as string;
    const title = params.title as string;

    console.log(`getServerSideProps server id = ${id}  title = ${title}`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pages/${id}/`);
    const {status, msg, blog} = await res.json();

    if (status == 'yes') {
        return {
            props:{
                status:status,
                msg: await BlogRender(blog),
                blog: blog
            }
        }

    } else {
        // Pass data to the page via props
        return {
            props: {status: status, msg: msg, blog: blog}
        }
    }

}