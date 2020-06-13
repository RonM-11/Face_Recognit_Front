import React, { Component } from 'react';
import Clarifai from 'clarifai'
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/Navigation.js';
import Logo from '../components/Logo/Logo.js';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm.js';
import Rank from '../components/Rank/Rank.js';
import Signin from '../components/Signin/Signin.js';
import Register from '../components/Register/Register.js';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js';
import './App.css';



const particlesOptions = {
   particles: {
      "number": {
      "value": 80,
      "density": {
         "enable": true,
         "value_area": 800
        }
      }
    }
 }
const initialState ={
      input : '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignin: false,
      user: {
        id: '', 
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id, 
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }
  calculateFaceLocation = (data) => {
      const clarifaiFaces = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return clarifaiFaces.map(clarifaiFace=> {
              return {
              leftCol: clarifaiFace.left_col*width,
              topRow: clarifaiFace.top_row*height,
              rightCol: (1-clarifaiFace.right_col)*width,
              bottomRow: (1-clarifaiFace.bottom_row)*height
            }
        })
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes })
  }

  onInputChange = (event) => {
    console.log('input', event.target.value)
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    console.log(this.state.input)
    this.setState({imageUrl: this.state.input});
    fetch('https://afternoon-retreat-68162.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log('re1', response)
      if(response) {
        fetch('https://afternoon-retreat-68162.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
      })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        }).catch(console.log);

      }
      console.log('res2' , response)
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch(err => console.log(err));   
  }

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({isSignin : true});
    } else {
      this.setState(initialState);
    } this.setState({route : route});
  }

  render() {
    const { isSignin, imageUrl, route, boxes} = this.state;
    const { name, entries } = this.state.user;
      return (
        <div className="App">
            <Particles className= 'particles'
              params = {particlesOptions}
            />
            <Navigation onRouteChange = {this.onRouteChange} isSignin = {isSignin}/>
            { route === 'home' 
              ? <div>
                   <Logo />
                   <Rank name={name} entries={entries}/> 
                   <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
                   <FaceRecognition boxes = {boxes} imageUrl = {imageUrl}/>
                 </div>
              : ( route === 'signin' 
                   ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
                   : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>                    
                    )
             }
        </div>
      );
  }
}

export default App;