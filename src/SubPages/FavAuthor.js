import React from "react";
import AuthorSidebar from "./AuthorSidebar";
import '../App.css';
import { Card, Button } from 'react-bootstrap';

export default class FavAuthor extends React.Component {

    constructor() {
        super();
        this.state = {
            author: [],
            AuthorTempState: []
        }

    }

    remfavBttn = (Auth) => {


        const filterData = this.state.AuthorTempState.filter(data => data._id !== Auth._id)

        Auth.idfav = false;

        const updateAuthor = [Auth, ...filterData]

        updateAuthor.sort((a, b) => (a._id > b._id) ? 1 : -1)

        this.setState({
            author: updateAuthor
        });

        localStorage.setItem('authors', JSON.stringify(this.state.author));

    }

    componentWillMount() {
        const newAuthors = JSON.parse(localStorage.getItem('authors'));

        
        this.setState({
            author: newAuthors,
            AuthorTempState: newAuthors
        })
    }




    render() {
        return (
            <div>
                <div className="AppWhole">
                    <AuthorSidebar />
                    <div className="App">
                        <div className="author">
                            {this.state.author.map(
                                (Author) => (Author.idfav) ?
                                    (<div key={Author._id}>

                                        <Card style={{ margin: 20 }} border="dark" bg="light" text="grey">
                                            <Card.Body>
                                                <Card.Title>Name: {Author.name}
                                                        <Button size="sm" className='right' onClick={() => {
                                                            this.remfavBttn(Author);
                                                        }}>Remove Favt.</Button >

                                                </Card.Title>
                                                <Card.Text>
                                                    Bio: {Author.bio}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>Wiki: <a href='{Author.link}'>{Author.link}</a></Card.Footer>
                                        </Card>
                                    </div>) :
                                    (<></>))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
