import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
export default class ShareBox extends React.Component {

    state = {
        token:'',
        name:'',
        detail:''
    }
    constructor(props){
        super(props)
        if(props){
            this.state = {
                token: props.token,
                name: props.name 
            }
        }
    }
    componentDidMount(){
        // console.log(this.state)
    }

    onChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        const detail = {
          detail:this.state.detail
        }
        axios.post('https://project-207.herokuapp.com/transactions',detail,
        { headers: { Authorization: `Bearer ${this.state.token}` } })
        .then( res => {
          this.setState({
            detail:''
          })
          return(
            <Redirect to={{
                pathname: '/',
                state: { 
                    res:res
                }
            }}/>
          )
          
        }).catch( () => {
            alert('.:Connot share. Please try again:.')
        })
        
      }

    render(){
        return(
            <div className="margin-top">
                <div className="card margin-lr margin-top  has-background-light">
                <header className="card-header">
                    <p className="card-header-title">
                        @{this.state.name}
                    </p>
                    
                </header>
                <div className="card-content">
                <div className="field">
                <div className="control">
                    <textarea className="textarea is-light" name="detail" value={this.state.detail} placeholder="Write something..." onChange={this.onChange}></textarea>
                </div>
                </div>
                </div>
                <footer className="card-footer ">
                <form className="field" onSubmit={this.onSubmit}>
                    <p className="control margin-button">
                        <button className="button is-link">Share</button>
                    </p>
                </form>
                </footer>
                </div>
            </div>
        )
    }
}