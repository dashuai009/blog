import * as React from 'react';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {useRouter} from "next/router";
import {TextType} from "@/pages/api/blog-interface";
import {$getRoot} from "lexical";
import {$createCodeNode, $isCodeNode} from "@lexical/code";
import {PLAYGROUND_TRANSFORMERS} from "@/markdown-only/plugins/MarkdownTransformers";
import {
    $convertFromMarkdownString,
    $convertToMarkdownString
} from "@/lexical/markdown";

import {VariantType, enqueueSnackbar} from 'notistack';


async function SendText(token: any, id: any, text: string) {
    // console.log("editor text = ", text);
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/save/text`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            token: token,
            page_id: id,
            text: text
        }),
    });

    if (!response.ok) {
        return new Promise<any>((resolve, reject) => {
            resolve({
                status: 'no',
                msg: `response.ok is ${response.ok}, response.status = ${response.status}`
            } as any);
        })
    }

    return response.json();
}

export default function SaveToServer({textType}: any): JSX.Element {
    const router = useRouter();
    const [editor] = useLexicalComposerContext();

    const handleClickVariant = (res: any) => {
        // variant could be success, error, warning, info, or default
        let variant: VariantType = res.status == 'yes' ? 'success' : 'error';
        enqueueSnackbar(res.msg || 'save successfully', {variant});
    };
    let token = router.query.token;
    let id = router.query.id;

    const saveToServer = async () => {
        if (!token) return;
        const editorState = editor.getEditorState();
        if (textType == TextType.LEXICAL_RICHTEXT) {
            let text = "";
            text = JSON.stringify(editorState);
            handleClickVariant(await SendText(token, id, text));
        } else if (textType == TextType.MARKDOWN) {
            editor.update(async () => {
                let text = "";
                const root = $getRoot();
                const firstChild = root.getFirstChild();
                if ($isCodeNode(firstChild) && firstChild.getLanguage() === "markdown") {
                    text = firstChild.getTextContent();
                } else {
                    text = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS);
                }
                handleClickVariant(await SendText(token, id, text));
            })
        }
    }
    return <button onClick={saveToServer}> save </button>
}