import './RegisterCard.css'
function RegisterCard(){
    return(
        <>

        <div className='Register-form'>
            <form>
                <div className="Title">
                    <h1>
                        Join Chordify
                    </h1>
                    <p>Sign up today and discover, learn, and play like never before.</p>
                </div>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="email">Password</label>
                <input type="password" name="password" id="password" />
                <label htmlFor="c_password">Confirm password</label>
                <input type="password" name="c_password" id="c_password" />
                <button type="submit">Create account</button>
            </form>
            <img src="../src/assets/collage2.png" alt="login image"></img>
        </div>
        </>
    )
}

export default RegisterCard;