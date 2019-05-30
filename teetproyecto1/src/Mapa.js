import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Table, Button } from 'reactstrap'
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
      aux: null,
      rutas:[],
      i: 0
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
      const db1 = fire.firestore();
    } catch(e){
      console.log(e);
    }
  }

  componentWillUnmount(){
    clearInterval(this.componentDidMount)
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
    const db = fire.firestore();
    const id = 'Ruta' + this.state.i;
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection('usuarios').doc(fire.auth().currentUser.uid).collection('Rutas').doc(id).set({
      Ruta: dataaux
    })
    this.setState({
      userLocationData: []
    });
    console.log(dataaux);
    console.log(fire.auth().currentUser.uid);
    this.setState({
      i: this.state.i + 1
    });
    
  }

  getRoute() {
    console.log("Getting route")
    const db1 = fire.firestore();
    db1.collection('usuarios').doc(fire.auth().currentUser.uid).collection('Rutas').get().then((snapShots) => {
      this.setState({
        rutas: snapShots.docs.map( doc => {
          return {id:doc.id, data: doc.data()}
        })
      })

    }, error => {
      console.log(error)
    });

  }

  render() {

    const { loading, userLocation, rutas } = this.state;
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
          <p>
            <button type="button" className="Map-logout-btn" onClick={this.getRoute.bind(this)}>Actualizar Rutas</button>
          </p>
          <label>
            Ruta
            {JSON.stringify(this.state.userLocationData)}
          </label>
        </header>

          <h2>
              Mis Rutas
            </h2>

            <Table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Rutas</th>
                </tr>
              </thead>
              <tbody>
                {rutas && rutas !== undefined ? rutas.map((ruta,key) =>(
                  <tr key = {key}>
                    <td>{ruta.id}</td>
                    <td>{ruta.data.Ruta}</td>
                  </tr>
                )): null }
              </tbody>
            </Table>
            <Map google={google} initialCenter={userLocation} zoom={18} style={style}>
              <Marker name={'Current location'} position={userLocation} />
            </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAoE7WtbUZw9ErOHlWpz__awRz5_YuS7X4")
})(Mapa)
