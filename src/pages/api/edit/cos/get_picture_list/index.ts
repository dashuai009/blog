

import {NextApiRequest, NextApiResponse} from "next";
import {check_edit_token} from "@/pages/api/check-token";
import COS from 'cos-nodejs-sdk-v5';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //获得某篇文章内的图片列表
    const {page_id, token} = req.body;
    const Bucket = `${process.env.NEXT_PUBLIC_COS_BUCKET}`;
    const Region = `${process.env.NEXT_PUBLIC_COS_REGION}`
    const cos = new COS({
        SecretId: `${process.env.COS_SECRET_ID}`,
        SecretKey: `${process.env.COS_SECRET_KEY}`,
    })
    if (page_id == -1 && token == 'token') {
        cos.getBucket({
            Bucket, /* 必须 */
            Region,     /* 存储桶所在地域，必须字段 */
            Prefix: 'home/',           /* 非必须*/
        }, function (err, data) {
            if (err) {
                res.send({status: 'no'})
            } else {
                let pictureName = data.Contents.filter(v => {
                    return v.Key != 'home/';
                }).map(item => {
                    return `https://${Bucket}.cos.${Region}.myqcloud.com/${item.Key}`;
                });
                res.send({status: 'yes', pictureList: pictureName})
            }
        });
    } else if (!check_edit_token(token)) {
        return res.send({status: 'no'})
    } else {
        cos.getBucket({
            Bucket, /* 必须 */
            Region,     /* 存储桶所在地域，必须字段 */
            Prefix: `${page_id}/`,           /* 非必须*/
        }, function (err, data) {
            if (err) {
                res.send({status: 'no'})
            } else {
                let pictureName = []
                for (let item of data.Contents) {
                    if (item.Key != `${page_id}/`) {
                        if (Number(item.Size) > 10000) {//大于10kb的返回缩略图
                            pictureName.push(`https://${Bucket}.cos.${Region}.myqcloud.com/${item.Key}`);
                        } else {
                            pictureName.push(`https://${Bucket}.cos.${Region}.myqcloud.com/${item.Key}`);
                        }
                    }
                }
                res.send({status: 'yes', pictureList: pictureName})
            }
        });
    }
    return;
}