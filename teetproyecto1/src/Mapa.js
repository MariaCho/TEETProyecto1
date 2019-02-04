import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from "axios";
import './loginSty.scss';
import fire from './config/Fire';

class Mapa extends Component {
  constructor(props){
    super(props)
    this.state = {
      userLocation: {
        lat: 0,
        lng: 0
      },
      isMarkerShown: false,
      loading: true
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
        const data = JSON.stringify(this.state);
        console.log(data);
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

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  //componentDidMount() {
  //  this.getDataFromDb();
  //  if (!this.state.intervalIsSet) {
  //    let interval = setInterval(this.getDataFromDb, 1000);
  //    this.setState({ intervalIsSet: interval });
  //  }
  //}

  // never let a process live forever 
  // always kill a process everytime we are done using it
  
  // just a note, here, in the front end, we use the id key of our data object 
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify 
  // data base entries

  // our first get method that uses our backend api to 
  // fetch data from our data base
  /* getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3001/api/putData", {
      id: idToBeAdded,
      message: message
    });
  };


  // our delete method that uses our backend api 
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:3001/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };


  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("http://localhost:3001/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };*/

  render() {
    const { loading, userLocation } = this.state;
    const { google } = this.props;
    const style = {
      width: '75%',
      height: '75%'
    }
    if (loading) {
      return null;
    }
    return (
        <div >
          <button type="button" className="logout-btn" onClick={this.logout.bind(this)}>Logout</button>
          <div className="rootaux-container"> 
            <Map google={google} initialCenter={userLocation} zoom={18} style={style}>
              <Marker name={'Current location'} />
            </Map>
          </div>
        </div>
    );
  }
}

//export default App;
export default GoogleApiWrapper({
  apiKey: ("")
})(Mapa)
