import React, {useState, useRef} from 'react'
import { Form, Button } from 'react-bootstrap';
import { addUser, fetchUser } from '../config/NodeServer';

//RegEx for Validation
const RegForEmail = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$');
const RegForName = RegExp('^[a-zA-Z]+\\s[a-zA-Z]+$')
const RegForUsername = RegExp('^[a-zA-Z0-9]{8,20}$')
const RegForPassword = RegExp('^[a-zA-Z0-9@*!&%$]{8,15}$')

function Register() {

    //State Variables
    const [values,setValues] = useState({name:'',email:'',username:'',password:'',cpassword:''})
    const [errors,setErrors] = useState({name:'',email:'',username:'',password:'',cpassword:''})

    //useRef Assigning
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const cpasswordRef = useRef(null)


    //handler function to perform validation
    const handler = e =>{
        let name = e.target.name
        switch(name){
            case 'name':
                setErrors({...errors,name:RegForName.test(nameRef.current.value)?'':'Please Enter Full Name'})
                setValues({...values,name:nameRef.current.value})
                break

            case 'email':
                setErrors({...errors,email:RegForEmail.test(emailRef.current.value)?'':'Please Enter email in current format'})
                setValues({...values,email:emailRef.current.value})
                break

            case 'username':
                setErrors({...errors,username:RegForUsername.test(usernameRef.current.value)?'':'Please Enter username in alphanumeric'})
                setValues({...values,username:usernameRef.current.value})
                break

            case 'password':
                setErrors({...errors,password:RegForPassword.test(passwordRef.current.value)?'':'Password must be minimum 8 and maximum 15 characters'})
                setValues({...values,password:passwordRef.current.value})
                break

            case 'cpassword':
                setErrors({...errors,cpassword:values.password===cpasswordRef.current.value?'':'Password and Confirm Password Match'})
                setValues({...values,cpassword:cpasswordRef.current.value})
                break

            default:
        }

    }

    //formSubmit function to submit values to node js server
    const formSubmit = () =>{
        if(errors.name==='' && errors.email==='' && errors.username==='' && errors.password==='' && errors.cpassword===''){
            if(values.name!=='' && values.email!=='' && values.username!=='' && values.password!=='' && values.cpassword!==''){
                fetchUser().then(res =>{
                    const user = res.data
                    user.some(element => {
                        if(element.email !== values.email){
                            if(element.username !== values.username){ 
                                addUser(values).then(res =>{
                                    alert(res.data)
                                    window.location.replace('/')
                                })
                            }else{ alert("Username already exist") }
                        }else { alert("Email already exist") }
                    });
                })  
            }else{ alert("Input Fields Error!!!")}
        }else{ alert("Validation Error!!!")}
    }




    return (
        <div className="form-index">
            <div className ="form-index-content w-50 mx-auto">
                <h2 style={{textAlign:"center"}}>Sign Up</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" name="name" ref={nameRef} isValid={values.name!==''?true:false} isInvalid={errors.name!==''?true:false} onChange={e=>handler(e)}></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" ref={usernameRef} isValid={values.username!==''?true:false} isInvalid={errors.username!==''?true:false} onChange={e=>handler(e)}></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" ref={emailRef} isValid={values.email!==''?true:false} isInvalid={errors.email!==''?true:false} onChange={e=>handler(e)}></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" name="password" ref={passwordRef} isValid={values.password!==''?true:false} isInvalid={errors.password!==''?true:false} onChange={e=>handler(e)}></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="text" name="cpassword" ref={cpasswordRef} isValid={values.cpassword!==''?true:false} isInvalid={errors.cpassword!==''?true:false} onChange={e=>handler(e)}></Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.cpassword}</Form.Control.Feedback>
                    </Form.Group>
                   
                    <Button onClick={formSubmit} className="btn-index" variant="primary">Register</Button>
                </Form>
                <button onClick={()=> window.location.replace('/')} className="btn btn-text">Already a User? Sign in</button>
            </div>
        </div>
        
    )
}

export default Register
