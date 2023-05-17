// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {AppDataSource} from "@/pages/api/data-source";
import {BlogController} from "@/pages/api/blog-controller";
import {ListInterface} from "@/pages/api/blog-interface";

/**
 * 如果成功找到对应id的blog，用msg返回text内容
 * @param req
 * @param res
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ListInterface>
) {

    if (AppDataSource.isInitialized) {

    } else {
        await AppDataSource.initialize();
    }

    let value = await (new BlogController()).get_all_id_and_title(req, res);
    res.status(200).json({
        status: 'yes',
        data: value
    })
}
