import ExampleTheme from "./themes/ExampleTheme";
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {MarkdownShortcutPlugin} from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {$convertFromMarkdownString} from "@/lexical/markdown";

import ActionsPlugin from "./plugins/ActionsPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
// import prepopulatedText from "./SampleText";
import {CreateEditorArgs} from "lexical/LexicalEditor";
import {useEffect} from "react";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {PLAYGROUND_TRANSFORMERS} from "@/markdown-only/plugins/MarkdownTransformers";
import {EquationNode} from "@/lexical-playground/src/nodes/EquationNode";
import EquationsPlugin from "@/lexical-playground/src/plugins/EquationsPlugin";
import {HorizontalRuleNode} from "@lexical/react/LexicalHorizontalRuleNode";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {ImageNode} from "@/lexical/image";

function Placeholder() {
    return (
        <div className="editor-placeholder">
            Play around with the Markdown plugin...
        </div>
    );
}
//
// const editorConfig: any = {
//     editorState: prepopulatedText,
//     theme: ExampleTheme,
//     // Handling of errors during update
//     onError(error: any) {
//         throw error;
//     },
//     // Any custom nodes go here
//     nodes: [
//         HeadingNode,
//         ListNode,
//         ListItemNode,
//         QuoteNode,
//         CodeNode,
//         CodeHighlightNode,
//         TableNode,
//         TableCellNode,
//         TableRowNode,
//         AutoLinkNode,
//         LinkNode
//     ]
// };

export function CreateMarkdownOnlyInitialConfig(contentJson: string): CreateEditorArgs {
    return {
        editable: false,
        editorState: (!!contentJson ? contentJson : undefined) as any,
        namespace: 'Playground',
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            AutoLinkNode,
            LinkNode,
            EquationNode,
            HorizontalRuleNode,
            ImageNode
        ],
        onError: (error: Error) => {
            throw error;
        },
        theme: ExampleTheme,
    }
}
function Init({text}: any){
    const [editor] = useLexicalComposerContext();
    useEffect(()=>{
        editor.update(()=>{
            $convertFromMarkdownString(text, PLAYGROUND_TRANSFORMERS);
        })
    })
    return (<></>)
}
export default function MarkdownOnlyEditor({markdownText}: any) {
    let editorConfig = CreateMarkdownOnlyInitialConfig("");
    editorConfig.editable = true;
    return (
        <LexicalComposer initialConfig={editorConfig as any}>
            <div className="editor-shell">
                <ToolbarPlugin/>
                <div className="editor-container">
                    {/*// @ts-ignore*/}
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="ContentEditable__root"/>}
                        placeholder={<Placeholder/>}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <AutoFocusPlugin/>
                    <ListPlugin/>
                    <LinkPlugin/>
                    <EquationsPlugin/>
                    <MarkdownShortcutPlugin transformers={PLAYGROUND_TRANSFORMERS}/>
                    <CodeHighlightPlugin/>
                </div>
                <ActionsPlugin/>
                <Init text={markdownText}></Init>
            </div>
        </LexicalComposer>
    );
}
