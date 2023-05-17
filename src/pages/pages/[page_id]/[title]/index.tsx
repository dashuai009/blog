import {useRouter} from 'next/router'
import {PropsInterface} from "@/pages/api/blog-interface";
import css from './index.module.css';
import {BlogRender} from "@/non-pages/render";
import {Chip} from "@mui/material";
import Box from "@mui/material/Box";
import Head from "next/head";

export default function PostPage({status, msg, blog}: PropsInterface) {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{blog?.title}</title>
            </Head>
            <div className={css.mainInfo}>
                <div className={css.banner}>
                    <h1 className={css.title}>{blog!.title}</h1>
                    <div className={css.date}>
                        {(new Date(blog!.updated_at)).toLocaleDateString('en-US')}
                    </div>
                    <Box className={css.tags} sx={{listStyle: 'none'}}>
                        <li>
                            {blog!.tags.map((tag: string) => {
                                    return <Chip key={tag} label={tag}/>
                                }
                            )}
                        </li>
                        {/*    <mat-chip-list aria-label="tags">*/}
                        {/*        <mat-chip *ngFor="let tag of page.data.tags" selected color="primary">*/}
                        {/*        {{tag}}*/}
                        {/*    </mat-chip>*/}
                        {/*</mat-chip-list>*/}
                    </Box>
                </div>
            </div>
            {/*<div>{blog?.text}</div>*/}
            {/*<div>{msg}</div>*/}
            <div className={css.editorContainer} dangerouslySetInnerHTML={{__html: msg}}/>
            {/*<BlogEditor editMode={false} contentJson={data.blog.text}/>*/}
        </>
    )
}

// This gets called on every request
export async function getStaticProps({params}: any) {
    // Fetch data from external API
    const id = params.page_id as string;
    const title = params.title as string;

    // console.log(`getServerSideProps server id = ${id}  title = ${title}`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pages/${id}/`);
    const {status, msg, blog} = await res.json();

    if (status == 'yes') {
        return {
            props: {
                status: status,
                msg: await BlogRender(blog),
                blog: blog
            },
            revalidate: 10
        }

    } else {
        // Pass data to the page via props
        return {
            props: {status: status, msg: msg, blog: blog},
            revalidate: 10
        }
    }

}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pages/get_all_id_and_title`);
    const posts = await res.json();
    //
    // // Get the paths we want to pre-render based on posts
    const paths = posts.data.map((post : { page_id: number, title: string }) => ({
        params: { page_id: post.page_id.toString(), title: encodeURIComponent(post.title)},
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: 'blocking' } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' };
}