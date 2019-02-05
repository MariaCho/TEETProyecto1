import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import './Map.css'
import fire from './config/Fire';

class Mapa extends Component {
  constructor(props){
    super(props)
    this.state = {
      userLocationData: [],
      userLocation: {
        lat: 0,
        lng: 0
      },
      loading: true,
      aux: null
    }
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    try{
      setInterval(async () => {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
    
            this.setState({
              userLocation: { lat: latitude, lng: longitude },
              loading: false
            });
          },
          () => {
            this.setState({ loading: false });
          }
        );
        //const data = JSON.stringify(this.state);
        //console.log(data);
      }, 3000);
    } catch(e){
      console.log(e);
    }
  }

  renderPosition(position) {
    return { lat: position.coords.latitude, lng: position.coords.longitude };
  }

  logout() {
    fire.auth().signOut();
  }

  async beggin(){
    try {
      this.state.aux = setInterval(async () => {
        let locations = this.state.userLocationData.concat(this.state.userLocation);
        this.setState({
          userLocationData: locations
        });
        //const dataaux = JSON.stringify(this.state.userLocationData);
        //console.log(dataaux);
      }, 3000);
    } catch (error) {
      
    }
  }

  stop(){
    clearInterval(this.state.aux);
    const dataaux = JSON.stringify(this.state.userLocationData);
    console.log(dataaux);
  }

  render() {
    const { loading, userLocation } = this.state;
    const { google } = this.props;
    const style = {
      width: '100%',
      height: '83%',
      
    }
    if (loading) {
      return null;
    }
    return (
      <div>
        <header>
          <p>
            <button type="button" className="Map-logout-btn" onClick={this.logout.bind(this)}>Logout</button>
          </p>
          <p>
            <button type="button" className="Map-logout-btn" onClick={this.beggin.bind(this)}>Empezar</button>
          </p>
          <p>
            <button type="button" className="Map-logout-btn" onClick={this.stop.bind(this)}>Parar</button>
          </p>
          <label>
            Ruta
            {JSON.stringify(this.state.userLocationData)}
          </label>
        </header>
        <Map google={google} initialCenter={userLocation} zoom={18} style={style}>
          <Marker name={'Current location'} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAoE7WtbUZw9ErOHlWpz__awRz5_YuS7X4")
})(Mapa)
