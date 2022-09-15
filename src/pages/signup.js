import React from 'react'; 
import  'assets/styles.css';
import {auth, db, storage} from "../utils/firebase"
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const navigate = useNavigate();

    const [email, setEmail] = React.useState("");
    const [image, setImage] = React.useState("");
    const [userId, setUserId] = React.useState();
    const [imageUrl, setImageUrl] = React.useState("");

    const [password, setPassword] = React.useState("");

    const [loading, setLoading] = React.useState(false);
    const [error, setErrors] = React.useState("");

	React.useEffect(() => {
        if (imageUrl) {
            continueSignup(imageUrl);
        }
    }, [imageUrl]);


	 function continueSignup(imageUrl){
		const userCredentials = {
			email: email,
			createdAt: new Date().getTime(),
			userId: userId,
			image: imageUrl // firebase image url;
		};
		setImageUrl(""); // destroying to state;
		return db
		.doc(`/users/${userId}`)
		.set(userCredentials)
		.then(_=>{
			navigate("/home")
		})
	}



	const handleSubmit = (event) => {
		event.preventDefault();
		//validate file selected (accepted type includes png and jpeg)
		if(!['image/jpeg', 'image/png'].includes(image.type)){
			setLoading(false)
			setErrors('Invalid Image Selected')
			return
		}
		setErrors() // set errors to null 
		setLoading(true);
		try {
			auth
			.createUserWithEmailAndPassword(email, password)
			.then((data) => {
				setUserId(data.user.uid);
				if(image.name && data.user.uid){
					let imageAsFile = image;
					const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
					//initiates the firebase side uploading 
					uploadTask.on('state_changed', 
					(snapShot) => {
						//takes a snap shot of the process as it is happening
					}, (err) => {}, 
					() => {
						// gets the functions from storage refences the image storage in firebase by the children
						storage
						.ref('images').child(imageAsFile.name).getDownloadURL()
						.then(fireBaseUrl => {
							if(fireBaseUrl){
								//set image url in a global state
								setImageUrl(fireBaseUrl);
							}
						});
					});
				}
				if(image === '' || image === null) {
					alert(`not an image, the image file is a ${typeof(image)}`);
					return;
				}
			}).catch(err=>{
				setLoading(false);
				setErrors(err.message)
			})	
		} catch (err) {
			setLoading(false);
		}
	};
    
	return (
		<div component="main">
			<hr />
			<div className="container">
				<h1>
					Sign Up
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

					<input
						className="input"
						required
						name="image"
						placeholder="Upload Image"
						type="file"
						id="image"
						// value={image}
						onChange={(e) => setImage(e.target.files[0])}
					/>
					<button type="submit" className="button"
						disabled={loading || !email || !password}>
						Sign Up</button>
					<br/>
					<p className='loader' hidden={!loading}>Loading ...</p>
					<div>
						<a href="login">
							"Have an account? Login"
						</a>
					</div>
					
				</form>
			</div>
		</div>
	);
}

export default Signup;