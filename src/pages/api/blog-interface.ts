import {Blog} from "@/pages/api/blog";

export enum TextType {
    RAW_TEXT = "raw_text",
    MARKDOWN = "markdown",
    MARKDOWN_URL = "markdown_url",
    ONENOTE = "onenote",
    TYPST = "typst",
    LEXICAL_RICHTEXT = "lexical_richtext",
    IPYNB = "jypter notebook"
}

export type PropsInterface = {
    status: 'yes' | 'no',
    msg: string,
    blog: Blog | null
}
export class BlogInterface {

    page_id!: number;

    title!: string;

    author!: string;

    created_at!: Date;

    updated_at!: Date;

    content!: string;

    tags!: string[];

    text!: string;

    views!: number;

    likes!: number;

    text_type!:TextType;
}