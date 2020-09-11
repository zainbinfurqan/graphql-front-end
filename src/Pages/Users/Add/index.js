import React, { useReducer } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const ADD_USER = gql`
 mutation SetUserMutation($firstName:String!,$lastName:String!,$email:String!,$password:String!){
    createUser(firstName:$firstName,lastName:$lastName,email:$email,password:$password,){
    firstName,
    lastName,
    email,
    password
  }
}
`;
const initalState = {
    f_name: '',
    l_name: '',
    email: '',
    password: '',
}

function reducer(state, action) {
    switch (action.type) {
        case 'HANDLE_CHANGE':
            return { ...state, ...action.payload }
        default:
            return state;
    }
}

function AddModel(props) {
    const [state, dispatch] = useReducer(reducer, initalState)

    function handleChnage(label, value) {
        dispatch({
            type: 'HANDLE_CHANGE',
            payload: {
                [label]: value,
            },
        })
    }

    function handleSubmit(createUserFN) {
        createUserFN({
            variables: {
                firstName: state.f_name,
                lastName: state.l_name,
                email: state.email,
                password: state.password
            }
        })
        props.close('submited')
    }

    return (

        <div className={props.openAddForm ? 'modal d-block' : 'modal d-none'} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" onClick={props.close} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label for="exampleInputEmail1">First Name</label>
                            <input onChange={(e) => handleChnage('f_name', e.target.value)} value={state.f_name} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Last Name</label>
                            <input onChange={(e) => handleChnage('l_name', e.target.value)} value={state.l_name} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input onChange={(e) => handleChnage('email', e.target.value)} value={state.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Password</label>
                            <input onChange={(e) => handleChnage('password', e.target.value)} value={state.password} type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.close}>Close</button>
                        <Mutation mutation={ADD_USER}>
                            {(createUserFN, { data }) => (
                                <button onClick={() => handleSubmit(createUserFN)} type="button" className="btn btn-primary">Save changes</button>
                            )}
                        </Mutation>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddModel;