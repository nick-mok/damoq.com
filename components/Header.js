import Link from 'next/link';

export const Header = (props) => (
    <div id="header" className="container">
        <div className="row py-2">
            <div className="col-4 align-self-center">
                <div className=" font-weight-bold text-primary lead">damoq.com</div>
            </div>
            <div className="col-8 align-self-center">
                <ul className="navbar justify-content-end p-0 m-0">
                    <li className="nav-link mx-1 p-0">
                        <Link href="/">
                            <a className="d-block nav-link lead text-white bg-primary">Home</a>
                        </Link>
                    </li>
                    <li className="nav-link mx-1 p-0">
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