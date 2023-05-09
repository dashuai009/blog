// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {AppDataSource} from "@/pages/api/data-source";
import {BlogController} from "@/pages/api/blog-controller";
import {PropsInterface} from "@/pages/api/blog-interface";
import {Blog} from "@/pages/api/blog";
import {BlogRawText} from "@/non-pages/render";

/**
 * 如果成功找到对应id的blog，用msg返回text内容
 * @param req
 * @param res
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PropsInterface>
) {
    const {id} = req.query;

    if (AppDataSource.isInitialized) {

    } else {
        await AppDataSource.initialize();
    }

    let value = await (new BlogController()).get_page_by_id(req, res);
    if (value instanceof Blog) {
        res.status(200).json({
            status: 'yes',
            msg: await BlogRawText(value),
            blog: null
        })
    } else {
        res.status(200).json({
            status: 'no',
            msg: value,
            blog: null
        })
    }
}
