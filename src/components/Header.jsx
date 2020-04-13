import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default class Header extends React.Component {
  state = {
      token: '',
      name: '',
      email: '',
      password: '',
      name_c: '',
      password_c: ''
  }
  constructor(props){
      super(props)
      this.state = {
          token: this.props.token,
          name: this.props.name,
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

  onSubmitPassChange = e => {
      e.preventDefault()
      const password = {
        password:this.state.password_c
      }
      axios.put('https://project-207.herokuapp.com/users/password', password,
      { headers: { Authorization: `Bearer ${this.state.token}` } }
      ).then(() => {
        this.setState({
          password_c:''
        })
        alert('.:Change password completed:.')
      }).catch(error => alert(error))
  }

  onSubmitNameChange = e => {
    e.preventDefault()
    const name = {
      name:this.state.name_c
    }
    axios.put('https://project-207.herokuapp.com/users/name', name,
    { headers: { Authorization: `Bearer ${this.state.token}` } }
    ).then(res => {
        this.setState({
          name:res.data.name,
          name_c:''
        })
        alert('.:Change name completed:.')
    }).catch(error => alert(error))
  }

  logout = () =>{
    const token = {
      token:this.state.token
    }
    axios.post('https://project-207.herokuapp.com/users/logout',token,
    { headers: { Authorization: `Bearer ${this.state.token}` }})
    .then(() =>{
      this.setState({
        token:'',
        name: '',
        email: '',
        password: ''
      })
      alert('.:logout successful:.')
    })
    .catch(error => console.log(error))
  }

  render(){
    if(this.props.token)
      return (
        <div>
          <nav className="navbar is-black" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
              
              <div className="navbar-start margin-left">
              <div className="navbar-item has-dropdown is-hoverable">
                  <div className="navbar-link is-arrowless margin-right bg-right">
                    @{this.state.name} 
                  </div>
                  <div className="navbar-dropdown">
                    <div className="navbar-item">
                      Change username
                    </div>
                    <form className="navbar-item" onSubmit={this.onSubmitNameChange}>
                      <div>
                        <input className="input is-rounded" name="name_c" type="text" value={this.state.name_c} placeholder="username" onChange={this.onChange}/>
                        <br/>
                        <button className="button is-rounded is-link margin-input">Change</button>
                      </div>
                    </form>
                    <hr className="dropdown-divider"/>
                    <div className="navbar-item">
                      Change password
                    </div>
                    <form className="navbar-item" onSubmit={this.onSubmitPassChange}>
                      <div>
                        <input className="input is-rounded" name="password_c" value={this.state.password_c} type="password" placeholder="password" onChange={this.onChange}/>
                        <br/>
                        <button className="button is-rounded is-link margin-input">Change</button>
                      </div>
                    </form>
                    <hr className="navbar-divider has-background-danger"/>
                    <Link className="navbar-item" to="/login" onClick={this.logout} >
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
              <div className="navbar-end">
                  <Link className="navbar-item" to={{
                        pathname: '/',
                        state: { 
                            token: this.state.token,
                            name: this.state.name
                        }
                    }}>
                    <h1 className="logo-type">Sharing</h1>
                  </Link>
                  <div className="navbar-item margin-right">
                  <div className="buttons">
                    <Link className="button is-light" to={{
                        pathname: '/about',
                        state: { 
                            token: this.state.token,
                            name: this.state.name
                        }
                    }}>?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )
      else return(
        <div>
          <nav className="navbar is-black" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-end">
              <Link className="navbar-item" to="/login">
                    <h1>Login</h1>
                </Link>
                <Link className="navbar-item" to="/register">
                    <h1>Register</h1>
                </Link>
                <Link className="navbar-item" to="/login">
                    <h1 className="logo-type">Sharing</h1>
                </Link>
                <div className="navbar-item">
                  <div className="buttons">
                    <Link className="button is-light" to={{
                        pathname: '/about',
                        state: { 
                            token: this.state.token,
                            name: this.state.name
                        }}}>?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )
  }

}