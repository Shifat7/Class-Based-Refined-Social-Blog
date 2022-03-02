import React from "react";
import AuthorSidebar from "../SubPages/AuthorSidebar";
import ReactPaginate from 'react-paginate';
import { Card, Button } from 'react-bootstrap';

export default class Author extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            author: [],
            AuthorTempState: [],
            selectedPage: 0,
            Postsperpage: 4,
            PagesVisited: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);


    }

    async recievedData() {

        const res = await fetch(`https://api.quotable.io/authors?limit=30`);

        const data = await res.json();

        for (const element of data.results) {
            element.idfav = false;
        }

        data.results.sort((a, b) => (a._id > b._id) ? 1 : -1)

        this.setState({
            author: data.results,
            AuthorTempState: data.results
        });

    }


    saveAuth() {
        localStorage.setItem('authors', JSON.stringify(this.state.author));
    }

    
    getAuth() {
        const newAuthors = JSON.parse(localStorage.getItem('authors'));
        console.log(newAuthors)
        if (newAuthors && newAuthors.length > 0) {
            this.setState({
                author: newAuthors,
                AuthorTempState: newAuthors
            })
        } else {
            this.recievedData();
        }
    }




    componentDidMount() {
        console.log(this.state.author.length);

        if (this.state.author.length === 0) {
            this.getAuth();
        }


    }



    componentDidUpdate(prevProps, prevState) {
        if (this.state.author !== prevState.author) {
            this.saveAuth();
        }


    }





    favBttn(Auth) {

        const filterData = this.state.author.filter(data => data._id !== Auth._id)

        Auth.idfav = true;

        const updateAuthor = [Auth, ...filterData];

        updateAuthor.sort((a, b) => (a._id > b._id) ? 1 : -1)

        this.setState({
            author: updateAuthor
        });

    }

    remfavBttn(Auth) {


        const filterData = this.state.author.filter(data => data._id !== Auth._id)

        Auth.idfav = false;

        const updateAuthor = [Auth, ...filterData]

        updateAuthor.sort((a, b) => (a._id > b._id) ? 1 : -1)

        this.setState({
            author: updateAuthor
        });

    }




    handlePageClick = (e) => {

        const SelectedPage = e.selected;
        const Offset = SelectedPage * this.state.Postsperpage;

        this.setState({
            selectedPage: SelectedPage,
            PagesVisited: Offset
        });
    };



    render() {



        const { author } = this.state;

        const PageCount = Math.ceil(author.length / this.state.Postsperpage);

        const sliced = author.slice(this.state.PagesVisited, this.state.PagesVisited + this.state.Postsperpage);


        return (

            <div className="AppWhole">
                <AuthorSidebar />
                <div className="App">
                    <div className="author">
                        {sliced.map(
                            (Author) => (
                                <div key={Author._id}>
                                    <Card style={{ margin: 20 }} border="dark" bg="light" text="grey">
                                        <Card.Body>
                                            <Card.Title>Name: {Author.name}
                                                {
                                                    (Author.idfav) ? (<Button size="sm" className='right' onClick={() => 
                                                        this.remfavBttn(Author)
                                                    }>Remove Favt.</Button >) : (<Button size="sm" className='right' onClick={() => 
                                                        this.favBttn(Author)
                                                    }>Add Favt.</Button >)
                                                }
                                            </Card.Title>
                                            <Card.Text>
                                                Bio: {Author.bio}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>Wiki: <a href='{Author.link}'>{Author.link}</a></Card.Footer>
                                    </Card>


                                </div>
                            ))}

                        <div >
                            <ReactPaginate
                                pageCount={PageCount}
                                onPageChange={this.handlePageClick}
                                previousLabel={"<<"}
                                nextLabel={">>"}
                                containerClassName={'paginationLinks'}
                                disabledClassName={'paginationDisabled'}
                                activeClassName={'paginationActive'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
