import type {NextApiRequest, NextApiResponse} from 'next'
import {AppDataSource} from "@/pages/api/data-source";
import {BlogController} from "@/pages/api/blog-controller";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (AppDataSource.isInitialized) {

    } else {
        await AppDataSource.initialize();
    }

    let value = await (new BlogController()).get_list(req, res);
    res.status(200).json({
        status:'yes',
        msg: '',
        data: value
    })
}
