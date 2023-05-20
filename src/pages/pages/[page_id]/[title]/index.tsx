import {useRouter} from 'next/router'
import {PropsInterface} from "@/pages/api/blog-interface";
import css from './index.module.css';
import {BlogRender} from "@/non-pages/render";
import {Chip, Container, Stack} from "@mui/material";
import Head from "next/head";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function PostPage({status, msg, blog}: PropsInterface) {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{blog?.title}</title>
            </Head>
            <Container className={css.editorContainer}>
                <Box sx={{m: "20px auto"}}>
                    <h1 className={css.title}>{blog!.title}</h1>
                    <div className={css.date}>
                        {(new Date(blog!.updated_at)).toLocaleDateString('en-US')}
                    </div>

                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        useFlexGap flexWrap="wrap"
                        spacing={1.5}
                    >
                        {blog!.tags.map((tag: string) => {
                                return <Chip key={tag} label={tag}/>
                            }
                        )}
                    </Stack>
                </Box>
                {/*<div>{blog?.text}</div>*/}
                {/*<div>{msg}</div>*/}
                <Paper elevation={10} sx={{p: "15px"}} dangerouslySetInnerHTML={{__html: msg}}/>
                {/*<BlogEditor editMode={false} contentJson={data.blog.text}/>*/}

            </Container>

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
    // console.log(res.body)
    if (!res.ok) {
        return {paths: [], fallback: 'blocking'}
    }
    const posts = await res.json();
    //
    // // Get the paths we want to pre-render based on posts
    const paths = posts.data.map((post: { page_id: number, title: string }) => ({
        params: {page_id: post.page_id.toString(), title: encodeURIComponent(post.title)},
    }));
    // We'll pre-render only these paths at build time.
    // { fallback: 'blocking' } will server-render pages
    // on-demand if the path doesn't exist.
    return {paths, fallback: 'blocking'};
}