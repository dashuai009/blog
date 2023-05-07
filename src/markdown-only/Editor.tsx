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
import {TRANSFORMERS} from "@lexical/markdown";

import ActionsPlugin from "./plugins/ActionsPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import prepopulatedText from "./SampleText.js";
import {CreateEditorArgs} from "lexical/LexicalEditor";

function Placeholder() {
    return (
        <div className="editor-placeholder">
            Play around with the Markdown plugin...
        </div>
    );
}

const editorConfig: any = {
    editorState: prepopulatedText,
    theme: ExampleTheme,
    // Handling of errors during update
    onError(error: any) {
        throw error;
    },
    // Any custom nodes go here
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
        LinkNode
    ]
};

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
            LinkNode
        ],
        onError: (error: Error) => {
            throw error;
        },
        theme: ExampleTheme,
    }
}

export default function MarkdownOnlyEditor() {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="editor-shell">
                <ToolbarPlugin/>
                <div className="editor-container">
                    {/*// @ts-ignore*/}
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="ContentEditable__root"/>}
                        placeholder={<Placeholder/>}
                    />
                    <AutoFocusPlugin/>
                    <ListPlugin/>
                    <LinkPlugin/>
                    <MarkdownShortcutPlugin transformers={TRANSFORMERS}/>
                    <CodeHighlightPlugin/>
                </div>
                <ActionsPlugin/>
            </div>
        </LexicalComposer>
    );
}
