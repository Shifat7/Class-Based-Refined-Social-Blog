import React from "react";
import { Link } from 'react-router-dom';
import withRouter from "../withRouter";
import { Spinner, Col } from 'react-bootstrap';

class User extends React.Component {



    constructor() {
        super();
        this.state = {
            user: [],
            posts: [],
            isLoading: true
        }
    }


    async receivedData() {

        const id = this.props.params.Id;

        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
            const res2 = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);


            const data = await res.json();
            const data2 = await res2.json();

            this.setState({
                user: data2,
                posts: data,
                isLoading: false
            });

        } catch (e) {
            console.log(e);
        }

    }

    componentDidMount() {
        this.receivedData()
    }



    render() {
        const { user, posts, isLoading } = this.state;
        console.log(this.state)
        return (
            <div>



                <div className="AppWhole">
                    <div className="App">
                        <div className="users">
                            {(isLoading) ? <Col className="m-5 text-center"><Spinner className="spinner" animation="border" /> </Col> :
                                <div>
                                    <div className="user">
                                        <h3>Name: {user.name}</h3>
                                        <p>Username: {user.username}</p>
                                        <p>Email: {user.email}</p>
                                        <p>Phone Number: {user.phone}</p>
                                        <p>Website: {user.website}</p>
                                    </div>

                                    <h1 style={{ color: 'white' }}>Posts:</h1>

                                    <div>
                                        {posts.map(
                                            Post => (
                                                <div className="post" key={Post.userId}>
                                                    <h3>{Post.title}</h3>
                                                    <p>{Post.body}</p>
                                                    <button className="button"><Link to={`/Comments/${Post.id}`}>Details</Link></button>
                                                    <p className="ID">{Post.id}</p>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(User);