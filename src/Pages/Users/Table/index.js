import React, { useState, useReducer } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AddModel from '../Add'
import { act } from 'react-dom/test-utils';

const GET_USERS_QUERY = gql`
 query GetUserQuery{
    getUsers{
    _id,
    firstName,
    lastName,
    email
  }
}
`;



function Table(props) {

    const [openAddForm, setOpenAddForm] = useState(false)

    return (
        <>
            {<AddModel openAddForm={openAddForm} close={() => setOpenAddForm(!openAddForm)} userAdded={} />}
            <Query query={GET_USERS_QUERY}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <h4>loading</h4>
                        if (error) console.log(error)
                        return (
                            <>
                                <div className='d-flex p-2 bd-highlight' >
                                    <button type="button" onClick={() => setOpenAddForm(!openAddForm)} className='btn btn-primary' >Add User </button>
                                </div>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Profile</th>
                                            <th scope="col ">View</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    {data.getUsers.map((_, i) => {
                                        return (
                                            <tbody key={i}>
                                                <tr>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{_.firstName}</td>
                                                    <td>{_.lastName}</td>
                                                    <td>{_.email}</td>
                                                    <td>{_.email}</td>
                                                    <td><i className='fa fa-eye cursor' style={{ cursor: 'pointer' }}></i></td>
                                                    <td><i className='fa fa-edit' style={{ cursor: 'pointer' }}></i></td>
                                                    <td><i className='fa fa-trash' style={{ cursor: 'pointer' }}></i></td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </table>
                            </>
                        )
                    }
                }
            </Query>
        </>
    );
}

export default Table;