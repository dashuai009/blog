import * as React from 'react';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {useRouter} from "next/router";
import PicturePicker from "@/components/PicturePicker";

export default function AddPicture(): JSX.Element {
    const router = useRouter();
    const [editor] = useLexicalComposerContext();
    return <PicturePicker token={router.query.token} page_id={router.query.id}/>
}