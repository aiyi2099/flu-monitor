import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
// import { addressPoints } from './realworld.10000.js';
import '../../node_modules/leaflet/dist/leaflet.css';


class FluMap2 extends React.Component {

    state = {
        mapHidden: false,
        layerHidden: false,
        addressPoints: []
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({ addressPoints: this.props.results });
        }, 5000);
    }

    render() {
        if (this.state.mapHidden) {
            return (
                <div>
                    <input
                        type="button"
                        value="Toggle Map"
                        onClick={() => this.setState({ mapHidden: !this.state.mapHidden })} />
                </div>
            );
        }
        const gradient = { '0.1': '#89BDE0', '0.2': '#96E3E6', '0.4': '#82CEB6', '0.6': '#FAF3A5', '0.8': '#F5D98B', '1.0': '#DE9A96'};

        const position = [51.965,19.808];

        return (
            <div>
                <Map center={position} zoom={6}>
                    {!this.state.layerHidden &&
                    <HeatmapLayer
                        fitBoundsOnLoad
                        fitBoundsOnUpdate
                        points={this.state.addressPoints}
                        longitudeExtractor={m => m[1]}
                        latitudeExtractor={m => m[0]}
                        gradient={gradient}
                        radius={10}
                        intensityExtractor={m => undefined} />
                    }
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </Map>
                <input
                    type="button"
                    value="Toggle Map"
                    onClick={() => this.setState({ mapHidden: !this.state.mapHidden })} />
                <input
                    type="button"
                    value="Toggle Layer"
                    onClick={() => this.setState({ layerHidden: !this.state.layerHidden })} />
            </div>
        );
    }

}

export default FluMap2;