import Header from './Header';
import Main from './Main';
import Head from 'next/head';

const Layout = (props) => (
    <div>
        <Head>
            <title>{props.pageTitle ? props.pageTitle + " - " : ""}Damoq</title>
            <meta name="yandex-verification" content="ffd1a1d3d375597c" />
        </Head>
        <Header />
        <Main>
            {props.children}
        </Main>
    </div>
);

export default Layout;