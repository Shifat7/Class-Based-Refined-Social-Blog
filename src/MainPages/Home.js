import React from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import ReactPaginate from 'react-paginate';
import { Card, Button } from 'react-bootstrap';

export default class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            PagesVisited: 0,
            selectedPage: 0,
            perPage: 10,
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }


    async receivedData() {

        let res = await fetch("https://jsonplaceholder.typicode.com/posts");

        let data = await res.json();

        this.setState({
            posts: data
        })

        const newPosts = JSON.parse(localStorage.getItem('posts'));

        if (newPosts && newPosts.length > 0) {
            const LSdata = Object.assign(data, newPosts);
            this.setState({ posts: LSdata });
        } else {
            this.setState({ posts: data });
        }


    }


    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const Offset = selectedPage * this.state.perPage;

        this.setState({
            selectedPage: selectedPage,
            PagesVisited: Offset
        }, () => {
            this.receivedData()
        });

    };


    componentDidMount() {
        this.receivedData()
    }



    render() {

        let pageCount = Math.ceil(this.state.posts.length / this.state.perPage)

        let sliced = this.state.posts.slice(this.state.PagesVisited, this.state.PagesVisited + this.state.perPage)

        return (
            <div>
                <div className="AppWhole">
                    <div className="App">
                        <div className="posts">
                            {sliced.map(
                                Post => (<>
                                    <div  key={Post.id}>
                                        <Card style={{margin: 20}} border="dark" className="text-center" bg="light" text="grey">
                                            <Card.Body>
                                                <Card.Title>{Post.title}</Card.Title>
                                                <Card.Text>
                                                    {Post.body}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer className="text-muted"><Link className='details' to={`/Comments/${Post.id}`}><Button size="sm" variant="outline-dark">Details</Button></Link></Card.Footer>
                                        </Card>
                                    </div>
                                </>))}



                            <ReactPaginate
                                pageCount={pageCount}
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
