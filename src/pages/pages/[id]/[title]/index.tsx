import {useRouter} from 'next/router'
import {PropsInterface} from "@/pages/api/blog-interface";
import css from './index.module.css';
import {BlogRender} from "@/non-pages/render";
import {Chip} from "@mui/material";
import Box from "@mui/material/Box";

export default function PostPage({status, msg, blog}: PropsInterface) {
    const router = useRouter()
    const id = router.query.id as string;
    const title = router.query.title as string;
    // console.log(status, msg, blog)

    return (
        <>
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
export async function getServerSideProps({params}: any) {
    // Fetch data from external API
    const id = params.id as string;
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
            }
        }

    } else {
        // Pass data to the page via props
        return {
            props: {status: status, msg: msg, blog: blog}
        }
    }

}