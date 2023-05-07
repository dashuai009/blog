import {JSDOM} from "jsdom";
import {createHeadlessEditor} from "@lexical/headless";
import {CreateInitialConfig} from "@/lexical-playground/src/BlogEditor";
import {BlogInterface, TextType} from "@/pages/api/blog-interface";
import {$generateHtmlFromNodes} from "@lexical/html";
import {CreateEditorArgs} from "lexical/LexicalEditor";
import {PLAYGROUND_TRANSFORMERS} from "@/markdown-only/plugins/MarkdownTransformers";
import {
    $convertFromMarkdownString
} from "@lexical/markdown";
import {CreateMarkdownOnlyInitialConfig} from "@/markdown-only/Editor";

function LexicalRender(EditorArgs: CreateEditorArgs, blog: BlogInterface) {
    const dom = new JSDOM();
    // @ts-ignore
    global.window = dom.window
    global.document = dom.window.document
    global.DocumentFragment = dom.window.DocumentFragment
    const editor = createHeadlessEditor(EditorArgs);
    return new Promise<String>((resolve, reject) => {
        if(blog.text_type == TextType.LEXICAL_RICHTEXT){
            editor.setEditorState(editor.parseEditorState(blog.text));
        }
        editor.update(() => {
            if(blog.text_type == TextType.MARKDOWN){
                $convertFromMarkdownString(
                    blog.text,
                    PLAYGROUND_TRANSFORMERS
                );
            }
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