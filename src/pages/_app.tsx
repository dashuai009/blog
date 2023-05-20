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

import '@/styles/globals.css'


import type {AppProps} from 'next/app'
import {AppBar, Container, CssBaseline, Fab, Fade, IconButton, Toolbar, useScrollTrigger} from "@mui/material";
import Typography from "@mui/material/Typography";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import {createSvgIcon} from '@mui/material/utils';
import Link from "next/link";
import {useRouter} from "next/router";
import {enqueueSnackbar, SnackbarProvider} from 'notistack';

const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>,
    'Home',
);

function ScrollTop(props: any) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{position: 'fixed', bottom: 16, right: 16}}
            >
                {children}
            </Box>
        </Fade>
    );
}

export default function App({Component, pageProps}: AppProps) {
    const router = useRouter();
    return (
        <>
            <CssBaseline/>
            <AppBar>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                        onClick={(e) => {
                            router.push("/");
                        }}
                    >
                        <HomeIcon></HomeIcon>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                        onClick={(e) => {
                            router.push(`mailto:${process.env.NEXT_PUBLIC_EMAIL}`);
                        }}
                    >
                        <EmailIcon></EmailIcon>
                    </IconButton>

                    <Box sx={{flexGrow: 1}}/>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                        onClick={(e) => {
                            router.push("/list");
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor"/>

            <Container sx={{padding:"5px"}}>
                <Component {...pageProps} />
            </Container>


            <SnackbarProvider maxSnack={5} />
            <ScrollTop {...pageProps}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </>
    )
}
