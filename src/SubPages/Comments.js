import React from "react";
import '../App.css';
import withRouter from '../withRouter';
import { Card } from 'react-bootstrap';


class Comments extends React.Component {


    constructor() {
        super();
        this.state = {
            comments: null,
            post: null
        }
    }



    async receivedData() {
        const id = this.props.params.id;

        let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);

        let data = await res.json();

        const Comments = await data.map(Com => (

            <div key={Com.id} > 
                <Card style={{ margin: 20 }} border="dark" bg="light" text="grey">
                    <Card.Body>
                        <Card.Title>{Com.name}</Card.Title>
                        <Card.Text>
                        <img src={`https://randomuser.me/api/portraits/men/${Com.id}.jpg`} style={{marginRight: 10, marginBottom: 20, border: "solid"}} className="img" alt="profilepic" height="50" width="50" />
                            {Com.body}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        ));


        this.setState({
            comments: Comments
        })
    }


    async receivedData2() {
        const id = this.props.params.id;

        const res2 = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

        const data2 = await res2.json();

        const Post = <div key={data2.id} className="postcom">
            <h3>{data2.title}</h3>
            <p>{data2.body}</p>
        </div>;


        this.setState({
            post: Post
        })
    }


    componentDidMount() {
        this.receivedData2();
        this.receivedData();

    }

    render() {
        console.log(this.state)

        return (
            <div className="AppWhole">
                <div className="App">
                    <div className="comments">
                        {this.state.post}
                        {this.state.comments}
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(Comments);