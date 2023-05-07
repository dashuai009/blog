// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {AppDataSource} from "@/pages/api/data-source";
import {BlogController} from "@/pages/api/blog-controller";
import {PropsInterface} from "@/pages/api/blog-interface";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PropsInterface>
) {
    const {id} = req.body;

    // console.log(`/save/text body = ${req.body}`)
    if (AppDataSource.isInitialized) {

    } else {
        await AppDataSource.initialize();
    }

    let updateRes = await (new BlogController()).updateText(req, res);
    if (updateRes.affected == 1) {
        // myDB.redis_del(`${req_data.page_id}_id_html`)
        // myDB.redis_del(`${req_data.title}_title_html`)
        return res.send({
            status: 'yes',
            msg: '',
            blog: null
        })
    } else {
        return res.send({
            status: 'no',
            msg: JSON.stringify(updateRes),
            blog: null
        })
    }
}
