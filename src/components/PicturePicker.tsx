import Button from "@mui/material/Button";
import * as React from "react";
import {Popover} from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import * as COS from 'cos-js-sdk-v5';
import {now} from "lodash-es";
import {enqueueSnackbar, VariantType} from "notistack";

interface TempKeys {
    credentials: {
        tmpSecretId: string,
        tmpSecretKey: string,
        sessionToken: string
    },
    expiration: string,
    startTime: number,
    expiredTime: number,
    requestId: string
}

export function sampleUploadFile(res: TempKeys, page_id: number, file: File) {
    // @ts-ignore
    let cos = new COS({
        getAuthorization: function (options: any, callback: any) {
            // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
            // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
            // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
            callback({
                TmpSecretId: res.credentials.tmpSecretId,
                TmpSecretKey: res.credentials.tmpSecretKey,
                SecurityToken: res.credentials.sessionToken,
                // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                StartTime: res.startTime, // 时间戳，单位秒，如：1580000000
                ExpiredTime: res.expiredTime, // 时间戳，单位秒，如：1580000900
                ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
            })
        }
    })
    cos.putObject({
        Bucket: `${process.env.NEXT_PUBLIC_COS_BUCKET}`,
        Region: `${process.env.NEXT_PUBLIC_COS_REGION}`,
        Key: `${page_id}/${file.name}`,
        StorageClass: 'STANDARD',
        Body: file
    }, function (err: COS.CosError, data: COS.PutObjectResult) {
        if (err) {
            let variant: VariantType = 'error';
            enqueueSnackbar('upload error!' + err, {variant});
        } else {
            let variant: VariantType = 'success';
            enqueueSnackbar('upload successfully!!', {variant});
        }
    })
}


function TitlebarImageList({picList}: { picList: PicItem[] }) {
    return (
        <ImageList sx={{width: 500, height: 450}}>
            <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">December</ListSubheader>
            </ImageListItem>
            {picList.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        // subtitle={item.author}
                        actionIcon={
                            <IconButton
                                sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                aria-label={`info about ${item.title}`}
                            >
                                <InfoIcon/>
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

interface PicItem {
    img: string,
    title: string
}

export default function PicturePicker({page_id, token}: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [tempKey, setTempKey] = React.useState<null | TempKeys>(null);
    const [picList, setPicList] = React.useState<PicItem[]>([]);
    const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/edit/cos/get_picture_list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                page_id,
                token
            })
        }).then(r => r.json())
            .then(r => {
                if (r.status == 'yes') {// 申请成功
                    setPicList(r.pictureList.map((item: any) => {
                        return {
                            img: item,
                            tile: "test"
                        }
                    }));
                } else {// 申请失败，返回null
                    let variant: VariantType = 'error';
                    enqueueSnackbar('request tempkey error!' + r.msg, {variant});
                }
            });
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onFileSelected = async (event: any) => {
        // console.log(now(), tempKey, tempKey ? tempKey.expiredTime - now() / 1000 : 'null');
        if (tempKey && (now() + 60 * 1000 < tempKey.expiredTime * 1000)) {// 如果还剩60s，那就继续用
            sampleUploadFile(tempKey, page_id, event.target.files[0]);
        } else {
            let t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/edit/cos/request_tempkey`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    page_id,
                    token
                })
            }).then(r => r.json())
                .then(r => {
                    if (r.status == 'yes') {// 申请成功
                        return r.tempKey;
                    } else {// 申请失败，返回null
                        let variant: VariantType = 'error';
                        enqueueSnackbar('request tempkey error!' + r.msg, {variant});
                        return null;
                    }
                });
            if (t) {// 如果申请成功，设置一个定时器去清理tmepkey
                setTempKey(t);
                setTimeout(() => {
                    setTempKey(null);
                }, t.expiredTime * 1000 - now())
            } else {
                // 那我也没办法了
            }
        }
    }

    const canBeOpen = Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;

    return <>
        <Button aria-describedby={id} type="button" onClick={handleClick}>
            pic
        </Button>
        <Popover
            id={id}
            open={canBeOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <input type="file" onInput={onFileSelected}
                // style="display: none;"
                   aria-label="test"/>
            <TitlebarImageList picList={picList}></TitlebarImageList>
        </Popover>
    </>
}