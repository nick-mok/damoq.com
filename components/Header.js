import Link from 'next/link';

export const Header = (props) => (
    <div id="header" className="container">
        <div className="row py-2">
            <div className="col-4 align-self-center">
                <div className="font-weight-bold text-primary lead">
                    <Link href="/">
                        <a className="text-primary">damoq.com</a>
                    </Link>
                </div>
            </div>
            <div className="col-8 align-self-center">
                <ul className="navbar justify-content-end p-0 m-0">
                    <li key="home" className="nav-link mx-1 p-0 d-md-block d-none">
                        <Link href="/">
                            <a className="d-block nav-link lead text-white bg-primary">Home</a>
                        </Link>
                    </li>
                    <li key="portfolio" className="nav-link mx-1 p-0">
                        <Link href="/portfolio">
                            <a className="d-block nav-link lead text-white bg-primary">Portfolio</a>
                        </Link>
                    </li>
                    <li key="slug" className="nav-link mx-1 p-0">
                        <Link href="/blog">
                            <a className="d-block nav-link lead text-white bg-primary">Blog</a>
                        </Link>
                    </li>
                    
                </ul>
            </div>
            
        </div>
    </div>
);

export default Header;