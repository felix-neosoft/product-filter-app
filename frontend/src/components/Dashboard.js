import React,{useState,useEffect, useRef} from 'react'
import ls from 'localstorage-slim'
import {Navbar, Container, Nav, NavDropdown, Button, InputGroup, FormControl, Form, Card, Carousel} from 'react-bootstrap'
import { productsfetch } from '../config/NodeServer'



function Dashboard() {

    const [products,setProducts] = useState([])
    const [query,setQuery] = useState('')

    useEffect(()=>{
        productsfetch().then(res=>{
            setProducts(res.data)
        })
    },[])    

    const logout = () =>{
        ls.set("isLogged",false)
        ls.set("username",null)
        window.location.replace('/')
        alert("Logout Successfull")
    }
    return (
        <div style={{backgroundColor:'#6E3CBC'}}>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/dashbaord">TechShopping</Navbar.Brand>
                    <InputGroup style={{marginLeft:"650px"}} className="w-25">
                        <FormControl onChange={e => setQuery(e.target.value)}/>
                        <InputGroup.Text>Search</InputGroup.Text>
                    </InputGroup>
                    <Navbar.Toggle />
                    <Navbar.Collapse id="dropdown-menu-bar"/>
                    <Nav className="me-auto">
                        <NavDropdown title={`Welcome ${ls.get('username')}`} id="dropdown-menu-bar">
                            <NavDropdown.Item onClick={()=>logout()}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            
            <div className="d-flex justify-content-end">
                <Form.Select className="w-25 my-4 me-5" onChange={e => setQuery(e.target.value)}>
                    <option value="">All</option>
                    <option value="mobile">Mobile</option>
                    <option value="headphones">Headphones</option> 
                    <option value="laptop">Laptops</option>
                    <option value="camera">Cameras</option>     
                </Form.Select>
            </div>
            <Container fluid className="row">
                {products.filter(data =>{
                    if(query===''){
                        return data
                    }else if(data.name.toLowerCase().includes(query.toLowerCase())||data.category.includes(query)){
                        return data
                    }
                }).map((product)=>(
                    <Card className="card-box" key={product.id} style={{width:'300px'}} >
                        <Card.Img  className="card-img" style={{height:'300px'}} variant="top" src={product.images[0]}/>
                            <Carousel controls={false} indicators={false} pause="false" className="overlay">
                                <Carousel.Item><img height="300" src={product.images[0]}/></Carousel.Item>
                                <Carousel.Item><img height="300" src={product.images[1]}/></Carousel.Item>
                                <Carousel.Item><img height="300" src={product.images[2]}/></Carousel.Item>
                            </Carousel>
                
                        
                        <Card.Body>
                            <Card.Title style={{textAlign:"center"}}>{product.name}</Card.Title>
                            <Card.Text>Price : {product.price}</Card.Text>
                            <InputGroup className="my-4">
                                <InputGroup.Text>Quantity</InputGroup.Text>
                                <Form.Select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </Form.Select>
                            </InputGroup>
                            <Button className="btn-index" variant="primary">Add to Cart</Button>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
            
            <div className="footer">
                <h4>&copy;2021, Created By Felix Mathew</h4>
            </div>
        </div>
    )
}

export default Dashboard
