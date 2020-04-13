import React from 'react'
import { Redirect } from 'react-router-dom'
import SharedArea from './SharedArea'
import axios from 'axios'
import Header from './Header'
import ShareBox from './ShareBox'

export default class Timeline extends React.Component{
    state = {
        id:'',
        token:'',
        name:'',
        sharing:[]
    }
    constructor(props){
        super(props)
        if(props.location.state)
            this.state = {
                id: this.props.location.state.id,
                token: this.props.location.state.token,
                name: this.props.location.state.name
            }
    }
    
    componentDidMount(){

        // check time of session
        axios.get('https://project-207.herokuapp.com/users/me',{
            headers: { Authorization: `Bearer ${this.state.token}` }
        }).catch(() =>{
            alert(".:Your session is about expire:.")
            this.setState({
                token:'',
                name:''
            })
        })

        //get sharing
        axios.get('https://project-207.herokuapp.com/transactions',{
            headers: { Authorization: `Bearer ${this.state.token}` }
        }).then((res) => {
            this.setState({
                sharing: res.data
            })
        }).catch(() =>{
            alert('.:Connot get data:.')
        })
        
    }

    componentWillUpdate(){
        axios.get('https://project-207.herokuapp.com/transactions',{
            headers: { Authorization: `Bearer ${this.state.token}` }
        }).then((res) => {
            this.setState({
                sharing: res.data
            })
        }).catch(() =>{
            alert('.:Connot get data:.')
        })
    }

    render(){
        if(!this.state.token) return (
            <div>
                <Redirect to='/login' />
            </div>
        )
        else if(this.state.sharing){
            return(
                <div>
                    <Header token={this.state.token} name={this.state.name} />
                    <ShareBox token={this.state.token} name={this.state.name}/>
                    {this.state.sharing.map(item =>  <SharedArea key={item._id} _uid={this.state.id} sharing={item} token={this.state.token}/>)}
                   
                </div>
            )
        }else return(
            <div>
                <Header token={this.state.token} name={this.state.name}/>
                Please share new one.
            </div>
        )
    }
}