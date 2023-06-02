import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { _apiulruser } from '../apiURLs';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate =useNavigate();
    const [output, setOutput] = useState();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    
    
    const handleSubmit=()=>{
        var userDetails={"email":email,"password":password}
        axios.post(_apiulruser+"login",userDetails).then((response)=>{
           // console.log(response);
            //setOutput("form submitted");
          //setOutput(response.data.result);
         if(response.data.token!="error"){
           // setOutput("login successfuly");
        let user=response.data.userdetails;
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("_id",user._id);
        localStorage.setItem("name",user.name);
        localStorage.setItem("email",user.email);
        localStorage.setItem("adderess",user.adderess);
        localStorage.setItem("city",user.city);
        localStorage.setItem("gender",user.gender);
        localStorage.setItem("mobile",user.mobile);
        localStorage.setItem("role",user.role);
        localStorage.setItem("info",user.info);
        user.role== "admin"? navigate("/admin"):navigate("/user");
         }
         else{
            setOutput("invalid user or verify your account");
            setEmail("");
            setPassword("");
         }
                })
       
      }

 return (
        <div id="content">
            {/* About Start */}
            <div class="about wow fadeInUp" data-wow-delay="0.1s">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-5 col-md-6">
                            <div class="about-img">
                                {/* <img src="img/about.jpg" alt="Image"> */}
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-6">
                            <div class="section-header text-left">
                                <p>Welcome to eAuction</p>
                                <h1>Login</h1>
                            </div>
                            <div class="about-text">

                                <font style={{ "color": "blue" }}>{output}</font>
                                <form className='login-form'>

                                    <div class="form-group">
                                        <label for="email">Email address:</label>
                                        <input type="email" class="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <br />
                                    <div class="form-group">
                                        <label for="pwd">Password:</label>
                                        <input type="password" class="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                                    </div>
                                    <button type="button" onClick={ handleSubmit } class="btn btn-success">Submit</button>
                                </form>
                                <a class="btn" href="">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* About End */}
        </div>
    );
}

export default Login;