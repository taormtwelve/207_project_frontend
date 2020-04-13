import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

export default class About extends React.Component{
    constructor(props){
        super(props)
        if(props.location.state)
            this.state = {
                token: this.props.location.state.token,
                name: this.props.location.state.name
            }
    }

    componentDidMount(){
        // if(this.props.location.state){
        //     this.state = {
        //         token: this.props.location.state.token,
        //         name: this.props.location.state.name
        //     }
        // }
    }

    render(){
        return (
            <div>
            <Header token={this.state.token} name={this.state.name} />
            <div className="card margin-lr">
                <div className="card-content margin-top">
                    <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                        <img src={process.env.PUBLIC_URL+'/tao_profile.jpg'} alt="." />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">Ronnachai Muangkham</p>
                        <p className="subtitle is-6">@taormtwelve</p>
                    </div>
                    </div>

                    <div className="content">
                    610610608 <Link href="#"> #Backend_Developer</Link><br/>
                    A computer engineering student in Chiangmai university.
                    </div>
                </div>
            </div>
            <div className="card margin-lr">
                <div className="card-content margin-top">
                    <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                        <img src={process.env.PUBLIC_URL+'/speed_profile.jpg'} alt="." />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">Rungrod Thongjampa</p>
                        <p className="subtitle is-6">@deepdurgnur</p>
                    </div>
                    </div>

                    <div className="content">
                    610610609 <Link href="#"> #Frontend_Developer</Link><br/>
                    A computer engineering student in Chiangmai university.
                    </div>
                </div>
            </div>
        
        </div>
        )
    }
}
