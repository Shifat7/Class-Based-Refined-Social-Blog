import React from "react";
import '../App.css';
import * as ReactBootStrap from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { Col, Spinner } from 'react-bootstrap';


export default class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            SearchTerm: '',
            PagesVisited: 0,
            selectedPage: 0,
            perPage: 4,
            selectedOption: null,
            isLoading: true
        }
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }



    async receivedData() {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await res.json();


            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                users: data,
                isLoading: false
            });

        } catch (e) {

            console.log(e);

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




    handleChange = (selectedOption) => {
        this.setState({ selectedOption });

        if (selectedOption) {
            this.setState({ SearchTerm: selectedOption.value });
        } else {
            this.setState({ SearchTerm: '' });
        }
    };



    render() {
        const { users, SearchTerm, isLoading } = this.state;





        const filterData = users.filter((val) => {
            if (SearchTerm === '') {
                return val;
            } else if (val.name.toLowerCase().includes(SearchTerm.toLowerCase())) {
                return val;
            } else if (val.email.toLowerCase().includes(SearchTerm.toLowerCase())) {
                return val;
            }
        });


        let sliced = filterData.slice(this.state.PagesVisited, this.state.PagesVisited + this.state.perPage)


        const RenderUsers = sliced.map(val => (
            <tr key={val.id}>
                <td><Link to={`/Users/User/${val.id}`}>{val.id}</Link></td>
                <td><Link to={`/Users/User/${val.id}`}>{val.name}</Link></td>
                <td><Link to={`/Users/User/${val.id}`}>{val.email}</Link></td>
            </tr>));




        const options = [];

        users.forEach((val) => {
            options.push({
                label: `${val.name}`,
                value: val.name,
            });
        });




        return (
            <div>



                <div className="AppWhole">
                    <div className="App">
                        <div className="users">
                            <div>

                                <h1 style={{ color: 'white' }}>Users</h1>

                                <div className='searchUser' >
                                    <Select
                                        isClearable
                                        options={options}
                                        onChange={this.handleChange}
                                        isSearchable
                                        placeholder={"Choose"}
                                        value={this.state.selectedOption}
                                    />
                                </div>



                                <div className="user" style={{ marginTop: 75 }}>
                                    {(isLoading) ? <Col className="my-5 text-center"><Spinner className="spinner" animation="border" />
                                    </Col> : (
                                        <div className="app-container">
                                            <ReactBootStrap.Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            ID
                                                        </th>
                                                        <th>
                                                            Name
                                                        </th>
                                                        <th>
                                                            Email
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {RenderUsers}
                                                </tbody>
                                            </ReactBootStrap.Table>

                                            <ReactPaginate
                                                pageCount={this.state.pageCount}
                                                onPageChange={this.handlePageClick}
                                                previousLabel={"<<"}
                                                nextLabel={">>"}
                                                containerClassName={'paginationLinks'}
                                                disabledClassName={'paginationDisabled'}
                                                activeClassName={'paginationActive'}
                                            />
                                        </div>

                                    )}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>


        );
    }
}
