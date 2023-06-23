import {NextApiRequest, NextApiResponse} from "next";
import {AppDataSource} from "@/pages/api/data-source";
import {BlogController} from "@/pages/api/blog-controller";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (AppDataSource.isInitialized) {

    } else {
        await AppDataSource.initialize();
    }

    let value = await (new BlogController()).like(req, res);
    res.end();
}