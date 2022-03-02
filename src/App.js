import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComp from './NavbarComp';
import Footer from './Footer';
import Home from './MainPages/Home';
import Authors from './MainPages/Authors';
import Profile from './MainPages/Profile';
import Error from './MainPages/Error';
import Users from './MainPages/Users';
import Comments from './SubPages/Comments';
import FavAuthor from './SubPages/FavAuthor';
import User from './SubPages/User';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showButton: false

    };

    this.scrollToTop = this.scrollToTop.bind(this);
  }



  componentDidMount() {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        this.setState({
          showButton: true
        });
      } else {
        this.setState({
          showButton: false
        });
      }
    });
  }


  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  render() {


    return (
      <div className='AppRoot'>
        <Router>
          <NavbarComp />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/!#" element={<Home />} />
            <Route path="/:id" element={<Home />} />
            <Route path="/Authors" element={<Authors />} />
            <Route path="/FavAuthors" element={<FavAuthor />} />
            <Route path="/Users/" element={<Users />} />
            <Route path="/Users/User/:Id" element={<User />} />
            <Route path="/Users/User/!#" element={<User />} />
            <Route path="/Comments/:id" element={<Comments />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Routes>
          {this.state.showButton && (
            <button onClick={this.scrollToTop} className="back-to-top">^
            </button>)}
          <Footer />
        </Router>
      </div>
    );
  }
}


export default App;
