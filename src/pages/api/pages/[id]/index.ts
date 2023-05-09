// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {AppDataSource} from "@/pages/api/data-source";
import {BlogController} from "@/pages/api/blog-controller";
import {PropsInterface} from "@/pages/api/blog-interface";
import {Blog} from "@/pages/api/blog";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PropsInterface>
) {
    const {id} = req.query;

    console.log(`/pages/id id = ${id}`)
    if (AppDataSource.isInitialized) {

    } else {
        await AppDataSource.initialize();
    }

    let value = await (new BlogController()).get_page_by_id(req, res);
    if (value instanceof Blog) {
        res.status(200).json({
            status: 'yes',
            msg: "null",
            blog: value
        })


        // editor.update(() => {
        //     // In a headless environment you can use a package such as JSDom to parse the HTML string.
        //     const dom = new JSDOM(htmlString);
        //
        //     // Once you have the DOM instance it's easy to generate LexicalNodes.
        //     const nodes = $generateNodesFromDOM(editor, dom.window.document);
        //
        //     // Select the root
        //     $getRoot().select();
        //
        //     // Insert them at a selection.
        //     const selection = $getSelection();
        //     selection.insertNodes(nodes);
        // });

        // value.text ="";
    } else {
        res.status(200).json({
            status: 'no',
            msg: value,
            blog: null
        })
    }
}
