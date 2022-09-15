import React from 'react'; 
import  'assets/styles.css';
import {auth, db} from "../utils/firebase"
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
    const [user, setUser] = React.useState(null);

	React.useEffect(() => {
        if (user) {
            setUser(user)
        }
    }, [user]);

	
	auth.onAuthStateChanged(user=>{
		let userData = db.collection('users').doc(user.uid).get();
		userData.then(authUser=>{
			if (authUser.data()) {
				user = authUser.data()
				setUser(user)
			} else {
			}
		})
	})

	function logout(){
		setUser(null)
		navigate("/login")
	}
	
   if(user){
	   return <div component="main">
		<hr />
		<div className="container">
			<img src={user.image} className="img" alt={user?.userId}/>
			<p>
				<a href={"mailto:" + user?.email}>{user?.email}</a>
			</p>
			<div onClick={logout} className="logout">Logout</div>
		</div>
	</div>
   }
   return
	
}

export default Home;