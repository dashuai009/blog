/** @module @lexical/link */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {
    DOMConversionMap,
    DOMConversionOutput,
    EditorConfig,
    GridSelection,
    LexicalCommand,
    LexicalNode,
    NodeKey,
    NodeSelection,
    RangeSelection,
    SerializedElementNode,
} from 'lexical';

import {addClassNamesToElement, isHTMLAnchorElement} from '@lexical/utils';
import {
    $applyNodeReplacement,
    $getSelection,
    $isElementNode,
    $isRangeSelection,
    createCommand,
    ElementNode,
    Spread,
} from 'lexical';

export type ImageAttributes = {
    alt?: null | string;
};

export type SerializedImageNode = Spread<
    {
        type: 'image';
        url: string;
        version: 1;
    },
    Spread<ImageAttributes, SerializedElementNode>
>;

/** @noInheritDoc */
export class ImageNode extends ElementNode {
    /** @internal */
    __src: string;
    /** @internal */
    __alt: null | string;
    static getType(): string {
        return 'image';
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(
            node.__src,
            {alt: node.__alt},
            node.__key,
        );
    }

    constructor(url: string, attributes: ImageAttributes = {}, key?: NodeKey) {
        super(key);
        const {alt = null} = attributes;
        this.__src = url;
        this.__alt = alt;
    }

    createDOM(config: EditorConfig): HTMLImageElement {
        const element = document.createElement('img');
        element.src = this.__src;
        if (this.__alt !== null) {
            element.alt = this.__alt;
        }
        addClassNamesToElement(element, config.theme.image);
        return element;
    }

    updateDOM(
        prevNode: ImageNode,
        image: HTMLImageElement,
        config: EditorConfig,
    ): boolean {
        const url = this.__src;
        const alt = this.__alt;
        if (url !== prevNode.__url) {
            image.src = url;
        }

        if (alt !== prevNode.__alt) {
            if (alt) {
                image.alt = alt;
            } else {
                image.removeAttribute('alt');
            }
        }
        return false;
    }

    static importDOM(): DOMConversionMap | null {
        return {
            img: (node: Node) => ({
                conversion: convertImageElement,
                priority: 1,
            }),
        };
    }

    static importJSON(
        serializedNode: SerializedImageNode ,
    ): ImageNode {
        const node = $createImageNode(serializedNode.url, {
            alt: serializedNode.alt
        });
        node.setFormat(serializedNode.format);
        node.setIndent(serializedNode.indent);
        node.setDirection(serializedNode.direction);
        return node;
    }

    exportJSON(): SerializedImageNode  {
        return {
            ...super.exportJSON(),
            alt: this.getAlt(),
            type: 'image',
            url: this.getURL(),
            version: 1,
        };
    }

    getURL(): string {
        return this.getLatest().__src;
    }

    setURL(url: string): void {
        const writable = this.getWritable();
        writable.__src = url;
    }

    getAlt(): null | string {
        return this.getLatest().__alt;
    }

    setAlt(alt: null | string): void {
        const writable = this.getWritable();
        writable.__alt = alt;
    }

    insertNewAfter(
        selection: RangeSelection,
        restoreSelection = true,
    ): null | ElementNode {
        const element = this.getParentOrThrow().insertNewAfter(
            selection,
            restoreSelection,
        );
        if ($isElementNode(element)) {
            const ImageNode = $createImageNode(this.__src, {
                alt: this.__alt
            });
            element.append(ImageNode);
            return ImageNode;
        }
        return null;
    }

    canInsertTextBefore(): false {
        return false;
    }

    canInsertTextAfter(): false {
        return false;
    }

    canBeEmpty(): false {
        return false;
    }

    isInline(): true {
        return true;
    }

    extractWithChild(
        child: LexicalNode,
        selection: RangeSelection | NodeSelection | GridSelection,
        destination: 'clone' | 'html',
    ): boolean {
        if (!$isRangeSelection(selection)) {
            return false;
        }

        const anchorNode = selection.anchor.getNode();
        const focusNode = selection.focus.getNode();

        return (
            this.isParentOf(anchorNode) &&
            this.isParentOf(focusNode) &&
            selection.getTextContent().length > 0
        );
    }
}

function convertImageElement(domNode: Node): DOMConversionOutput {
    let node = null;
    if (domNode instanceof HTMLImageElement) {
        const content = domNode.textContent;
        if (content !== null && content !== '') {
            node = $createImageNode(domNode.getAttribute('src') || '', {
                alt: domNode.getAttribute('alt')
            });
        }
    }
    return {node};
}

export function $createImageNode(
    url: string,
    attributes?: ImageAttributes,
): ImageNode {
    return $applyNodeReplacement(new ImageNode(url, attributes));
}

export function $isImageNode(
    node: LexicalNode | null | undefined,
): node is ImageNode {
    return node instanceof ImageNode;
}
