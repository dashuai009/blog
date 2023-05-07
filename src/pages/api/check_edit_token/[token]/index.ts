import {NextApiRequest, NextApiResponse} from "next";
import {check_edit_token} from "@/pages/api/check-token";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {token} = req.query;
    if(!check_edit_token(token)){
        res.send({
            status:'no',
            msg:'error token'
        })
    }else{
        res.send({
            status:'yes'
        })
    }
}