import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'

export default class Register extends React.Component {
    state = {
        id:'',
        token:'',
        name:'',
        email: '',
        password: '',
    }

    constructor(props){
        super(props)

        this.state = {
            id:'',
            token:'',
            name:'',
            email: '',
            password: '',
        }
    }

    onChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    
    

    onSubmit = e => {
        e.preventDefault()
        const { name, email, password} = this.state
        axios.post('https://project-207.herokuapp.com/users', {
            name: name,
            email: email,
            password: password
        }).then(res => {
            this.setState({
                id:res.data.id,
                token: res.data.token,
                name: res.data.name
            })
        }).catch(() => alert('.:name or email already exists:.'))
    }

    render(){
        if(!this.state.token)
            return(
                <div>
                <Header/>
                <form className="center-register" onSubmit={this.onSubmit}>
                <h1 className="title" >Register</h1>
                    <div className="field margin-login">
                        <p className="control has-icons-left">
                            <input className="input" type="email" name="email" placeholder="Email" onChange={this.onChange}/>
                            <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                            </span>
                        
                        </p>
                    </div>
                    <div className="field margin-login">
                        <p className="control has-icons-left">
                            <input className="input" type="text" name="name" placeholder="Username" onChange={this.onChange}/>
                            <span className="icon is-small is-left">
                            <i className="fas fa-at"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field margin-login">
                        <p className="control has-icons-left">
                            <input className="input" type="password" name="password" placeholder="Password" onChange={this.onChange}/>
                            <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                    <p className="control margin-login">
                        <button className="button is-dark space">Register</button>
                        <button className="button is-light space">Login</button>
                    </p>
                    </div>
                </form>
                </div>
            )
        else return(
            <div>
                <Redirect to={{
                    pathname: '/',
                    state: { 
                        id:this.state.id,
                        token: this.state.token,
                        name: this.state.name
                    }
                }}/>
            </div>
        )
    }
}