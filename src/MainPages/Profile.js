import React from "react";
import '../App.css'



export default class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            Posts: [],
            act: 0,
            idx: '',
        }
    }

    componentDidMount() {
        this.refs.Title.focus();

        const initialState = JSON.parse(localStorage.getItem("posts")) || [];
        this.setState({ Posts: initialState });


    }


    componentWillUpdate(nextProps, nextState) {

        localStorage.setItem('posts', JSON.stringify(nextState.Posts))

    }


    handleSubmit = (e) => {
        e.preventDefault();
        let Posts = this.state.Posts;
        let Title = this.refs.Title.value;
        let Body = this.refs.Body.value;

        if (this.state.act === 0) {
            let Post = {
                "title": Title,
                "body": Body
            }
            Posts.push(Post);
        }
        else {
            let index = this.state.idx;
            Posts[index].title = Title;
            Posts[index].body = Body;
        }

        this.setState({
            Posts: Posts,
            act: 0
        })
        this.refs.myForm.reset();
        this.refs.Title.focus();
    }



    handleDelete = (index) => {
        let Posts = this.state.Posts;
        Posts.splice(index, 1);
        this.setState({
            Posts: Posts
        })
        this.refs.Title.focus();
    }

    handleEdit = (index) => {
        let Post = this.state.Posts[index];
        this.refs.Title.value = Post.title;
        this.refs.Body.value = Post.body;


        this.setState({
            act: 1,
            idx: index
        })
        console.log(Post);
    }


    render() {

        return (
            <div className='AppWhole'>
                <div className="App">
                    <div className="profiles">
                        <div className='profile'>

                            <form ref="myForm" >
                                <label><h4>Title: </h4></label>
                                <textarea type='text' ref='Title' className='add-body-text'></textarea>
                                <label><h4>Body: </h4></label>
                                <textarea type='text' ref='Body' className='add-body-text'></textarea>
                                <button onClick={e => this.handleSubmit(e)} className="add-post"> Save</button>
                            </form>
                        </div>
                        <div>
                            <div>
                                {this.state.Posts.map((POST, index) => (
                                    <div className='profile'>
                                        <div key={index}>
                                            Title: {POST.title} <br></br>
                                            Body: {POST.body}
                                        </div>

                                        <button className='delete' onClick={e => this.handleDelete(index)} >
                                            Delete Post
                                        </button>

                                        <button className='edit' onClick={e => this.handleEdit(index)}>
                                            Edit Post
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
