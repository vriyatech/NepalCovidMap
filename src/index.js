import React , { Component }  from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import { Map as LeafletMap,Polygon, GeoJSON,TileLayer,Circle, Marker, Popup } from 'react-leaflet';
import worldGeoJSON from 'geojson-world-map';



import axios from 'axios';


const district_url = 'https://raw.githubusercontent.com/mesaugat/geoJSON-Nepal/master/nepal-districts-new.geojson';
const headquarter_url = 'https://raw.githubusercontent.com/mesaugat/geoJSON-Nepal/master/nepal-district-headquarters.geojson';

class Map extends Component {
    constructor(props){
         super(props);
         this.state = {
           headquarter_json:[]
         }
       }

    componentWillMount() {
         axios.get(headquarter_url).then(res => {
           this.setState({headquarter_json: res.data})

         }).catch(err => {
           console.log('error')
         })
         }


    render_headquarter(){
    const {headquarter_json} = this.state;
       const features = headquarter_json.features;

            return(

                <LeafletMap
                    center={[27.710899, 85.195230]}
                    zoom={7}
                    maxZoom={20}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}>
                   {headquarter_json.features.map((item, i) => {
                        return this.getCircle(item,i)
                   })}
                <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
                </LeafletMap>
           )


    }

    getCircle(item,i){
    var radius = 500
    if(i>50){
        radius = radius * (i)
        const center = [item.geometry.coordinates[1],item.geometry.coordinates[0]]
        return(
            <Circle center={center} color="#8B0000" weight={0} radius={radius} fillOpacity={0.5}
                onMouseOver={(e) => {e.target.openPopup();}}>
                    <Popup>
                         <p><b>{item.properties.HQ_NAME}</b></p>
                         <p>Observation : {i}</p>
                         <p>Conformed : 1</p>
                         <p>Recovered :1</p>
                         <p>Deaths: 0</p>
                    </Popup>
            </Circle>
            );
        }
    }


    render_map(){
        const {headquarter_json} = this.state;
        const features = headquarter_json.features;

        if (typeof(features) =="undefined"){
                return('Initializing');
            }else{
                return(this.render_headquarter())
            }
        }

    render() {
            return(this.render_map())
    }
 }

ReactDOM.render(<Map/>, document.getElementById('root'));
export default Map


