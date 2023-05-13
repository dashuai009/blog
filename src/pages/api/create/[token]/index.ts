import {NextApiRequest, NextApiResponse} from "next";
import {check_edit_token} from "@/pages/api/check-token";
import {AppDataSource} from "@/pages/api/data-source";
import {BlogController} from "@/pages/api/blog-controller";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {token} = req.query;
    if (!check_edit_token(token)) {
        res.send({
            status: 'no',
            msg: 'error token'
        })
    }
    if (AppDataSource.isInitialized) {

    } else {
        await AppDataSource.initialize();
    }

    let value = await (new BlogController()).create_new(req, res);
    // console.log("insert result = ", value)
    if(value.raw.insertId >= 0){
        res.send({
            status: 'yes',
            page_id: value.raw.insertId
        })
    } else {
        res.send({
            status: 'no',
            msg: value.raw
        })
    }
}