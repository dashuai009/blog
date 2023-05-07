import {LexicalComposer} from '@lexical/react/LexicalComposer';
import * as React from 'react';

import {isDevPlayground} from './appSettings';
import {SettingsContext, useSettings} from './context/SettingsContext';
import {SharedAutocompleteContext} from './context/SharedAutocompleteContext';
import {SharedHistoryContext} from './context/SharedHistoryContext';
import Editor from './Editor';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import DocsPlugin from './plugins/DocsPlugin';
import PasteLogPlugin from './plugins/PasteLogPlugin';
import {TableContext} from './plugins/TablePlugin';
import TestRecorderPlugin from './plugins/TestRecorderPlugin';
import TypingPerfPlugin from './plugins/TypingPerfPlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import {CreateEditorArgs} from "lexical/LexicalEditor";

export function CreateInitialConfig(contentJson: string): CreateEditorArgs {
    return {
        editable: false,
        editorState: (!!contentJson ? contentJson : undefined) as any,
        namespace: 'Playground',
        nodes: [...PlaygroundNodes],
        onError: (error: Error) => {
            throw error;
        },
        theme: PlaygroundEditorTheme,
    }
}

function App({editMode, contentJson}: any): JSX.Element {
    const {
        settings: {isCollab, emptyEditor, measureTypingPerf},
    } = useSettings();
    let initialConfig = CreateInitialConfig(contentJson);
    initialConfig.editable = editMode;


    return (
        <LexicalComposer initialConfig={initialConfig as any}>
            <SharedHistoryContext>
                <TableContext>
                    <SharedAutocompleteContext>
                        <div className="editor-shell">
                            <Editor editMode={editMode}/>
                        </div>
                        {/* <Settings /> */}
                        {isDevPlayground ? <DocsPlugin/> : null}
                        {isDevPlayground ? <PasteLogPlugin/> : null}
                        {isDevPlayground ? <TestRecorderPlugin/> : null}

                        {measureTypingPerf ? <TypingPerfPlugin/> : null}
                    </SharedAutocompleteContext>
                </TableContext>
            </SharedHistoryContext>
        </LexicalComposer>
    );
}

export default function BlogEditor({editMode, contentJson}: any): JSX.Element {
    return (
        <SettingsContext>
            <App editMode={editMode} contentJson={contentJson}/>
        </SettingsContext>
    );
}
