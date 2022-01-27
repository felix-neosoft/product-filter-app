import React, {useState, useRef, useEffect} from 'react'
import ls from 'localstorage-slim'
import { Form, Button } from 'react-bootstrap';
import { fetchUser } from '../config/NodeServer';




//RegEx for Validation
const RegForUsername = RegExp('^[a-zA-Z0-9@._]{8,30}$')
const RegForPassword = RegExp('^[a-zA-Z0-9@*!&%$]{8,15}$')


function Login() {

    //State Variables
    const [values,setValues] = useState({username:'',password:''})
    const [errors,setErrors] = useState({username:'',password:''})
 
    //useRef Assigning
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    //Check whether loggedin or not
    useEffect(()=>{
        if(ls.get('isLogged')){
            window.location.replace('/dashboard')
        }
        else{
            ls.set('isLogged',false)
        }
    },[])
 
    //handler function to perform validation
    const handler = e =>{
        let name = e.target.name
        switch(name){
            case 'username':
                setErrors({...errors,username:RegForUsername.test(usernameRef.current.value)?'':'Please Enter username or email'})
                setValues({...values,username:usernameRef.current.value})
                break
 
            case 'password':
                setErrors({...errors,password:RegForPassword.test(passwordRef.current.value)?'':'Password must be minimum 8 and maximum 15 characters'})
                setValues({...values,password:passwordRef.current.value})
                break
 
            default:
        }
    }
 
    //formSubmit function to submit values to node js server
    const formSubmit = () =>{
        if(errors.username==='' && errors.password===''){
            if(values.username!=='' && values.password!==''){
                fetchUser().then(res =>{
                    const user = res.data
                    user.forEach(element => {
                        if((element.email === values.username && element.password === values.password) || (element.username === values.username && element.password === values.password)){
                            ls.set('isLogged',true)
                            ls.set('username',element.username)
                            window.location.replace('/dashboard')
                        }
                    });
                })  
            }else{ alert("Input Fields Error!!!")}
        }else{ alert("Validation Error!!!")}
    }
 
 
    return (
        <div className="form-index">
            <div className="index-header">
                <h1>Products Filter Web-App</h1>
            </div>
            <div className ="form-index-content w-50 login-f mx-auto">
                <h2 style={{textAlign:"center"}}>Sign In</h2>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" ref={usernameRef} isValid={values.username!==''?true:false} isInvalid={errors.username!==''?true:false} onChange={e=>handler(e)}></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" name="password" ref={passwordRef} isValid={values.password!==''?true:false} isInvalid={errors.password!==''?true:false} onChange={e=>handler(e)}></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Button onClick={formSubmit} className="btn-index" variant="primary">Login</Button>
                <button onClick={()=>window.location.replace('/register')} className="btn btn-text">Not a User? Sign Up</button>
            </div>
        </div>
    )
}

export default Login
