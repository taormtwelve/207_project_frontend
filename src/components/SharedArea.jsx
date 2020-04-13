import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Comment from './Comment'
export default class SharedArea extends React.Component{
    state = {
        _uid:'',
        _id:'',
        _pid:'',
        name:'',
        token:'',
        detail:'',
        goods:[],
        comments:[],
        gooded: false,
        comment:''
    }

    constructor(props){
        super(props)
        if(this.props){
            this.state = {
                _uid: this.props._uid,
                _id: this.props.sharing._id,
                _pid:this.props.sharing._uid,
                name:this.props.sharing.name,
                detail:this.props.sharing.detail,
                goods:this.props.sharing.goods,
                comments: this.props.sharing.comments,
                token:this.props.token
            }
        }
    }

    componentDidMount(){
        if(this.state.goods.filter(item => item._uid === this.state._uid).length === 1)
            this.setState({
                gooded: true
            })
    }


    onGood = e => {
        e.preventDefault()
        const user = {
            user:{
                _id:this.state._uid
            }
        }
        axios.post(`https://project-207.herokuapp.com/transactions/good/${this.state._id}`,user,
        { headers: { Authorization: `Bearer ${this.state.token}` } })
        .then( res => {
            this.setState({
                goods: res.data.user.goods,
                gooded: !this.state.gooded
            })
        }).catch((error) => console.log(error))
    }

    onChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onComment = e => {
        e.preventDefault()
        const comment ={
            comment: this.state.comment
        }
        // const user = {
        //     user:{
        //         _id:this.state._uid,
        //         comment: this.state.comment
        //     }
        // }
        axios.post(`https://project-207.herokuapp.com/transactions/comment/${this.state._id}`,comment,
        { headers: { Authorization: `Bearer ${this.state.token}` } })
        .then( res => {
            this.setState({
                comments: res.data.comments
            })
        }).catch((error) => console.log(error))

    }

    onDel = e => {
        e.preventDefault()
        const user = {
            user:{
                _id:this.state._uid
            }
        }
        axios.delete(`https://project-207.herokuapp.com/transactions/${this.state._id}`,
        { headers: { Authorization: `Bearer ${this.state.token}` } },user)
        .then( res => {
            return(
                <Redirect to={{
                    pathname: '/',
                    state: { 
                        res:res
                    }
                }}/>
            )
        }).catch((error) => console.log(error.message))
    }

    comment = e => e.target.comment.focus()

    render(){
        if(this.state.detail)
            if(this.state._pid === this.state._uid)
                return(
                    
                    <div name="id" value={this.state._id} className="margin-bottom">
                        <div className="card margin-lr margin-top">
                        <header className="card-header has-background-grey-lighter">
                            <p className="card-header-title">
                                @{this.state.name}
                            </p>
                            
                        </header>
                        <div className="card-content has-background-white-ter">
                            <div className="content">
                            {this.state.detail}
                            
                            <br/><br/><br/>
                            <p className="goods">{this.state.goods.length} {this.state.gooded ? '(You)':''} good(s)</p>
                            
                            </div>
                        </div>
                        <footer className="card-footer">
                            <button onClick={this.onGood} className="button is-link is-light is-fullwidth">Good</button>
                            <button onClick={this.comment} className="button is-link is-light is-fullwidth">Comment</button>
                            <button onClick={this.onDel} className="button is-light is-danger is-fullwidth">Delete</button>
                        </footer>
                        <footer className="card-footer">
                            <input className="input is-rounded margin-input" name="comment" type="text" placeholder="Comment" onChange={this.onChange}></input>
                            <button className="button is-rounded is-link margin-tb" onClick={this.onComment}>comment</button>
                        
                        </footer>
                        {this.state.comments.map(item => <Comment comment={item} /> )}
                        </div>
                    </div>
                )
            else return(
                <div id={this.state._id}>
                    <div className="card margin-lr margin-top ">
                    <header className="card-header has-background-grey-lighter">
                        <p className="card-header-title">
                            @{this.state.name}
                        </p>
                        
                    </header>
                    <div className="card-content has-background-white-ter">
                        <div className="content">
                        {this.state.detail}
                        
                        <br/><br/><br/>
                        <p className="goods">{this.state.goods.length} {this.state.gooded ? '(You)':''} good(s)</p>
                        {/* <time datetime="2016-1-1">{item.created}</time> */}
                        </div>
                    </div>
                    <footer className="card-footer">
                        <button onClick={this.onGood} className="button is-link is-light is-fullwidth">Good</button>
                        <button onClick={this.comment} className="button is-link is-light is-fullwidth">Comment</button>
                        
                    </footer>
                    <footer className="card-footer">
                        <input className="input is-rounded margin-input" name="comment" type="text" placeholder="Comment" onChange={this.onChange}></input>
                        <button className="button is-rounded is-link margin-tb" onClick={this.onComment}>comment</button>
                    </footer>
                    {this.state.comments.map(item => <Comment key={item._id} comment={item} /> )}
                    </div>
                </div>
            )
        else return(
            <div></div>
        )
    }
}