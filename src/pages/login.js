import React from 'react'; 
import  'assets/styles.css';
import {auth} from "../utils/firebase"
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setErrors] = React.useState("");

	// handleChange = (event) => {
	// 	this.setState({
	// 		[event.target.name]: event.target.value
	// 	});
	// };

	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		setErrors('');
		auth
		.signInWithEmailAndPassword(email, password)
		.then((data) => {
			setLoading(false)
			navigate("/home")
		})
		.catch((err) => { 
			setLoading(false)
			setErrors(err.message);
		})
	};
    
	return (
		<div component="main">
			<hr />
			<div className="container">
				<h1>
					Login
				</h1>
				{error && (
					<div className="error">
						{error}
					</div>
				)}
				<form onSubmit={handleSubmit}>
					<input
						className="input"
						required
						id="email"
						placeholder="Enter Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className="input"
						required
						name="password"
						placeholder="Enter Password"
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type="submit" className="button"
						disabled={loading || !email || !password}>Sign In</button>
					<br/>
					<p className='loader' hidden={!loading}>Loading ...</p>
					<div>
						<a href="signup">
							"Don't have an account? Sign Up"
						</a>
					</div>
				</form>
			</div>
		</div>
	);
	
}

export default Login;