import React from 'react'
import { Redirect,Link } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
export default class Login extends React.Component {
    state = {
        id:'',
        token: '',
        name: '',
        email: '',
        password: ''
    }
    
    constructor(props){
        super(props)
        if(props.location.state)
            this.state = {
                token: props.location.state.token,
                name: '',
                email: '',
                password: ''
            }
    }

    componentDidMount(){
        
    }

    onChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
        
    }

    onSubmit = e => {
        e.preventDefault()
        const { email, password } = this.state
        axios.post('https://project-207.herokuapp.com/users/login', {
            email: email,
            password: password
        }).then(res => {
            this.setState({
                id: res.data.id,
                token: res.data.token,
                name: res.data.name,
                email:'',
                password:''
            })
        }).catch(() => {
            alert(".:email or password inccorrect:.")
            this.setState({
                email:'',
                password:''
            })
        })
    }

    render() {
        if(!this.state.token)
            return(
                <div>
                <Header/>
                <form className="center-page" onSubmit={this.onSubmit}>
                    <h1 className="title" >Login</h1>
                    <div className="field margin-login">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="email" name="email" value={this.state.email} placeholder="Email" onChange={this.onChange}/>
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    
                    </p>
                    </div>
                    <div className="field margin-login">
                    <p className="control has-icons-left">
                        <input className="input" type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.onChange}/>
                        <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                        </span>
                    </p>
                    </div>
                    <div className="field">
                    <p className="control margin-login">
                        <button to="/" className="button is-dark space">Login</button>
                        <Link to="/register" className="button is-light space">Register</Link>
                    </p>
                    </div>
                </form>
                </div>
            )
        else return (
        <div>
            <Redirect to={{
                pathname: '/',
                state: { 
                    id: this.state.id,
                    token: this.state.token,
                    name: this.state.name
                }
            }}/>
        </div>
        )
    }
}