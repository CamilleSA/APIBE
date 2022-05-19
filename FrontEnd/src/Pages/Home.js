import { Button, Navbar, Container, Nav, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state, setState] = useState({
        author : "",
        message: "",
        image: ""

    })
    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    };

    const editMessage = (e) => {
        const id = e.target.id;
        const myHeaders = new Headers();
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Content-Type", "application/json; charset=UTF-8");

        const raw = JSON.stringify({"image": state.image, "author": state.author, "message": state.message});
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
        };

        fetch(`http://localhost:5500/posts/${id}`, requestOptions)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            window.location.reload();
        }).catch (function(error) {
            console.log(error);
        })
    }

    const sendMessage = () => {
        const myHeaders = new Headers();
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Content-Type", "application/json; charset=UTF-8");

        const raw = JSON.stringify({"image": state.image, "author": state.author, "message": state.message});
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        console.log(raw);

        fetch("http://localhost:5500/posts", requestOptions)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            window.location.reload();
        }).catch (function(error) {
            console.log(error);
        })
    }
  


    const deleteMessage = (e) => {
        const id = e.target.id;

        console.log(id);
        const myHeaders = new Headers();
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Content-Type", "application/json; charset=UTF-8");

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
        };

        fetch(`http://localhost:5500/posts/${id}`, requestOptions)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            window.location.reload();
        }).catch (function(error) {
            console.log(error);
        })
  
    }

    useEffect(() => {
        const url = "http://localhost:5500/posts";

        const fetchData = async() => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
                setData(json);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">
                    <img
                    alt=""
                    src="https://www.datocms-assets.com/45470/1631110818-logo-react-js.png"
                    width="50"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                    Messages
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={handleShow}>Add Message</Nav.Link>
                </Nav>
                </Container>
            </Navbar><br/><br/>
        {data.map((item, index) => 
            <div key={index} className="card mb-3 col-md-4 offset-md-4">
                <img className="card-img-top" style={{height: '150px'}} src={item.image} alt="Card"/>
                <div className="card-body">
                    <h5 className="card-title">Author: {item.author} / ID: {item._id}</h5>
                    <p className="card-text">Message: {item.message}</p>
                    <p className="card-text"><small className="text-muted">Date: {item.data}</small></p>
                    <div id="updateMessage">
                    <label>New Image</label>
                    <input id="image" className="form-control" defaultValue={state.image} onChange={handleChange} placeholder="Enter new image URL"></input><br/>
                    <label>New Author</label>
                    <input id="author" className="form-control" defaultValue={state.author} onChange={handleChange} placeholder="Enter new author"></input><br/>
                    <label>New Message</label>
                    <input id="message" className="form-control" defaultValue={state.message} onChange={handleChange} placeholder="Enter new message"></input><br/>
                    </div><br/>
                    <Button id={item._id} style={{marginRight: '2%'}} variant="warning" onClick={editMessage}>Update</Button>
                    <Button id={item._id} variant="danger" onClick={deleteMessage}>Delete</Button>
                </div>
            </div>
            
            )}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Post message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <label>Image</label>
                    <input id="image" className="form-control" defaultValue={state.image} onChange={handleChange} placeholder="Enter image url" /><br/>
                    <label>Author</label>
                    <input id="author" className="form-control" defaultValue={state.author} onChange={handleChange} placeholder="Enter author name" /><br/>
                    <label>Message</label>
                    <input id="message" className="form-control" defaultValue={state.message} onChange={handleChange} placeholder="Enter message" />
                    </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={sendMessage}>
                                Send Message
                            </Button>
                        </Modal.Footer>
                </Modal>
        </div>
    )

}

export default Home;