import './LoginCard.css'

function LoginCard() {
    return (
        <>
            <div className="TopBar">
                <img src="logo.png" alt="Logo" className="logo" />
                <p className="brand">Chordify</p>
            </div>

            <div className='Loginform'>
                <div className="form-container">

                    <div className="left-section">
                        <h1 className="form-title">Welcome to Chordify</h1>
                        <p className="form-subtitle">Sign in to your account.</p>

                        <form>
                            <label>Email</label>
                            <input type="email" placeholder="name@gmail.com" />

                            <label>Password</label>
                            <input type="password" placeholder="Password" />

                            <div className="forgot-password">
                                <a href="#">Forgot Password?</a>
                            </div>

                            <button type="submit">Login</button>

                            <div className="register">
                                <p>Don't have account? <a href="#">Register</a></p>
                            </div>
                        </form>
                    </div>

                    <img src="Loginphoto.png" alt="login" className="side-image" />
                </div>
            </div>
        </>
    )
}

export default LoginCard
