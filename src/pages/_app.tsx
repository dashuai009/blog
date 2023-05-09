import '@/styles/globals.css'

import '@/lexical-playground/src/index.css'
import '@/lexical-playground/src/ui/Button.css'
import '@/lexical-playground/src/ui/Dialog.css'
import '@/lexical-playground/src/ui/EquationEditor.css'
import '@/lexical-playground/src/ui/ContentEditable.css'
import '@/lexical-playground/src/ui/KatexEquationAlterer.css'
import '@/lexical-playground/src/ui/Modal.css'
import '@/lexical-playground/src/nodes/StickyNode.css'
import '@/lexical-playground/src/nodes/ImageNode.css'
import '@/lexical-playground/src/plugins/CommentPlugin/index.css'
import '@/lexical-playground/src/plugins/FloatingLinkEditorPlugin/index.css'
import '@/lexical-playground/src/plugins/TableCellResizer/index.css'
import '@/lexical-playground/src/plugins/CodeActionMenuPlugin/index.css'
import '@/lexical-playground/src/plugins/CodeActionMenuPlugin/components/PrettierButton/index.css'
import '@/lexical-playground/src/plugins/DraggableBlockPlugin/index.css'
import '@/lexical-playground/src/plugins/FloatingTextFormatToolbarPlugin/index.css'
import '@/lexical-playground/src/plugins/CollapsiblePlugin/Collapsible.css'
import '@/lexical-playground/src/plugins/TableOfContentsPlugin/index.css'
// import '@/lexical-playground/src/themes/CommentEditorTheme.css'
// import '@/lexical-playground/src/themes/StickyEditorTheme.css'
import '@/lexical-playground/src/themes/PlaygroundEditorTheme.css'
import 'katex/dist/katex.css';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
