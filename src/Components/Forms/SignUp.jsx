const SignUp = () => {
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <h3>Sign Up</h3>

                    <div className="mb-3">
                        <label>Nombre de usuario:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email:<br/></label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Ya tienes cuenta: <a href="/signin">Ingresar</a>
                    </p>
                    <p className="forgot-password text-right">
                        <a href="/">Volver</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp