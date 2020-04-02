import React from 'react'

export default class Welcome extends React.Component {
    render () {
        return (
            <div classname="row mt-5">
                <div classname="col-md-6 m-auto">
                    <div classname="card card-body text-center">
                    <h1><i classname="fab fa-node-js fa-3x"></i></h1>
                    <p>Create an account or login</p>
                    <a href="/users/register" classname="btn btn-primary btn-block mb-2"
                        >Register</a
                    >
                    <a href="/users/login" classname="btn btn-secondary btn-block">Login</a>
                    </div>
                </div>
            </div>
        )
    }
}
