import { Component } from "react";
export default class Login extends Component {
    render() {
        return (
            <>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign In</h3>

                        <div className="mb-3">
                            <label>Email:<br/> </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="mb-3">
                            <label>Contraseña: </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        <p className="forgot-password text-right">
                            <a href="/">Volver</a>
                        </p>
                    </form>
                </div>
            </div>
            </>
        );
    }
}