import React from 'react'

export default class Commnet extends React.Component {
    state = {
        name: '',
        comment:''
    }
    constructor(props){
        super(props)
        this.state = {
            name: this.props.comment.name,
            comment: this.props.comment.comment
        }
    }
    


    render(){
        return(
            <div>
                <div className="card-header has-background-light margin-comment">
                <label className="label margin-l">@{this.state.name}</label> : {this.state.comment} 
                </div>
            </div>
                
        )
    }


}