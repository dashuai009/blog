import {NextApiRequest, NextApiResponse} from "next";
import {check_edit_token} from "@/pages/api/check-token";
import * as STS from 'qcloud-cos-sts'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {page_id, token} = req.body;
    /*获取临时上传图片的tempKey */
    if (!check_edit_token(token)) {
        res.send({
            status: 'no',
            msg:'token error'
        })
        return;
    }
    let policy = STS.getPolicy([{
        action: [
            "name/cos:PutObject",
            "name/cos:GetBucket",
            "name/cos:OptionsObject"
        ],
        bucket: `${process.env.NEXT_PUBLIC_COS_BUCKET}`,
        region: `${process.env.NEXT_PUBLIC_COS_REGION}`,
        prefix: `${page_id}/*`//rnm
    }]);
    STS.getCredential({
        secretId: `${process.env.COS_SECRET_ID}`,
        secretKey: `${process.env.COS_SECRET_KEY}`,
        durationSeconds: 600,
        policy: policy,
    }, function (err, tempKey) {
        const result = err ? {status: 'no', msg: JSON.stringify(err)} :
            {status: 'yes', tempKey};
        res.send(result);
    });

}