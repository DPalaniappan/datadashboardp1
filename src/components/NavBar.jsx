import '../styles/NavBar.css'
const NavBar = () => {
    return(
        <div className="NavBar">
        <div className="Header">
        <h1>Country Data Dashboard</h1>
        </div>
        <div className="Nav">
        <ul>
            <li className="nav-item">
                <a href="/">
                <div>🏠 Home</div>
                </a>
            </li>
            <li className="nav-item">
                <a href="/">
                <div>🔍 Search</div>
                </a>
            </li>
            <li className="nav-item">
                <a href="/">
                <div>ℹ️ About</div>
                </a>
            </li>
        </ul>
        </div>

        </div>
    )
}

export default NavBar;
