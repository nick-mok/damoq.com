import Header from './Header';
import Main from './Main';
import Head from 'next/head';

const Layout = (props) => (
    <div>
        <Head>
            <title>{props.pageTitle ? props.pageTitle + " - " : ""}Damoq</title>
            <meta name="yandex-verification" content="ffd1a1d3d375597c" />
            <meta name="description" content="Damoq is my personal blog for sharing ideas on things web development, pop culture and food"></meta>
            <script type="text/javascript" src="https://www.bugherd.com/sidebarv2.js?apikey=eh78kk9psjjodbmr2pzzxw" async="true"></script>
        </Head>
        <Header />
        <Main>
            {props.children}
        </Main>
    </div>
);

export default Layout;