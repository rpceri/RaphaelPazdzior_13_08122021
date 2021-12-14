

function Nav() {

       
    return (
    <>
        <nav className="main-nav">

                <img
                className="main-nav-logo-image"
                src={`${process.env.PUBLIC_URL}/img/argentBankLogo.png`}
                alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>

            <div className="main-nav-link">

                    <i className="fa fa-user-circle"></i>Sign In
            
            </div>
        </nav>
    </>
    
    )
}

export default Nav;