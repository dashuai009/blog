import {JSDOM} from "jsdom";
import {createHeadlessEditor} from "@lexical/headless";
import {CreateInitialConfig} from "@/lexical-playground/src/BlogEditor";
import {BlogInterface, TextType} from "@/pages/api/blog-interface";
import {$generateHtmlFromNodes} from "@lexical/html";
import {CreateEditorArgs} from "lexical/LexicalEditor";
import {PLAYGROUND_TRANSFORMERS} from "@/markdown-only/plugins/MarkdownTransformers";
import {$convertFromMarkdownString, $convertToMarkdownString} from "@/lexical/markdown";
import {CreateMarkdownOnlyInitialConfig} from "@/markdown-only/Editor";

function LexicalRender(EditorArgs: CreateEditorArgs, blog: BlogInterface) {
    const dom = new JSDOM();
    // @ts-ignore
    global.window = dom.window
    global.document = dom.window.document
    global.DocumentFragment = dom.window.DocumentFragment
    const editor = createHeadlessEditor(EditorArgs);
    if (blog.text_type == TextType.LEXICAL_RICHTEXT) {
        editor.setEditorState(editor.parseEditorState(blog.text));
    } else if (blog.text_type == TextType.MARKDOWN) {
        editor.setEditorState(editor.parseEditorState(`{\"root\":{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}`));
        editor.update(() => {
            $convertFromMarkdownString(blog.text, PLAYGROUND_TRANSFORMERS)
        })
    }
    return new Promise<String>((resolve, reject) => {
        // console.log(PLAYGROUND_TRANSFORMERS, TRANSFORMERS)
        editor.update(() => {
            // if(blog.text_type == TextType.MARKDOWN){
            //     $convertFromMarkdownString(
            //         blog.text,
            //         PLAYGROUND_TRANSFORMERS
            //     );
            // }
            const htmlString = $generateHtmlFromNodes(editor, null);
            resolve(htmlString)
        })
    })

}

export function BlogRender(blog: BlogInterface) {
    switch (blog.text_type) {
        case TextType.LEXICAL_RICHTEXT: {
            return LexicalRender(CreateInitialConfig(""), blog);
            break;
        }
        case TextType.MARKDOWN: {
            return LexicalRender(CreateMarkdownOnlyInitialConfig(""), blog);
        }
        default: {
            return new Promise<String>((resolve, reject) => {
                resolve(`<h1> unsupport type {blog.text_type}. </h1>`)
            })
            break;
        }
    }

}

export function BlogRawText(blog: BlogInterface): Promise<string> {
    switch (blog.text_type) {
        case TextType.MARKDOWN : {
            const dom = new JSDOM();
            // @ts-ignore
            global.window = dom.window
            global.document = dom.window.document
            global.DocumentFragment = dom.window.DocumentFragment
            const editor = createHeadlessEditor(CreateMarkdownOnlyInitialConfig(""));
            return new Promise<string>((resolve, reject) => {
                editor.setEditorState(editor.parseEditorState(blog.text));
                editor.update(() => {
                    const markdown = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS);
                    resolve(markdown)
                })
            })
        }
        default: {
            return new Promise<string>((resolve, reject) => {
                resolve(blog.text)
            })
        }
    }
}