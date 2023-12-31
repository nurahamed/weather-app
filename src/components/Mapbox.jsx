import React, { useState, useEffect } from 'react'
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import Map, { Marker, Popup, GeolocateControl, NavigationControl, useControl } from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Stack, Button } from '@mui/material';
import { setLocation, setSaves, setItemSaved } from '../servises/weatherSlice';

// // import 'mapbox-gl/dist/mapbox-gl.css'
// // import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
// // import { useState } from 'react';

// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

// const token = mapboxgl.accessToken = `pk.eyJ1IjoibnVyYWhhbWVkIiwiYSI6ImNsa2lyOG44ZDA3eTczZmxleG1jeHJ4bmcifQ.UGL13FKb7MRRNgrVz4lQgA`

const Mapbox = (location, current) => {

    //     const lat = location?.lat
    //     const lng = location?.lon

    //     const [viewState, setViewState] = useState({
    //         longitude: lng,
    //         latitude: lat,
    //         zoom: 9
    //     });


    //     const [showPopup, setShowPopup] = useState(false)

    //     const fahrenheit = useSelector(state => state.weatherState.fahrenheit)
        const dispatch = useDispatch()
        const geolocateControlRef = React.useCallback((ref) => {
            if (ref) {
                ref.trigger()
            }
        }, [])

    //     const Geocoder = () => {
    //         const geoMap = new MapBoxGeocoder({
    //             accessToken: token,
    //             marker: false,
    //             collapsed: true
    //         })
    //         useControl(() => geoMap)
    //         geoMap.on('result', (e) => {
    //             dispatch(setLocation(e.result.text))

    //         })
    //     }

        const savedItems = JSON.parse(localStorage.getItem('savedItems'))
        const saves = useSelector(state => state.weatherState.saves)
        const savedToLocal = useSelector(state => state.weatherState.itemSaved)

        useEffect(() => {
            dispatch(setSaves(savedItems))
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])


        const addSaves = (item) => {
            let itemList = [...saves]
            let addArray = true
            for (let i = 0; i < saves.length; i++) {
                if (saves[i].name === item.name) {
                    itemList.splice(i, 1);
                    addArray = false
                }
            }
            if (addArray) {
                itemList.push(item)
            }
            dispatch(setSaves([...itemList]))
        }

        useEffect(() => {
            // save to local storage
            localStorage.setItem('savedItems', JSON.stringify(saves))
            if (savedItems) {
                for (let i = 0; i < savedItems.length; i++) {
                    if (savedItems[i].name === location.name) {
                        dispatch(setItemSaved(true))
                        // break to stop statement from throwing false
                        break
                    } else if (savedItems[i].id !== location.name) {
                        dispatch(setItemSaved(false))
                    }
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [savedItems])

    const customeColor = {
        color: 'red',
        height: 20,
        margin: '20% 0 20% 0',
        textAlign: 'center',
        fontWeight: 'bold'

    }




    return (
        <>
            <div style={customeColor}>
                Map is Under Devolopment. Comming soon !
            </div>
            {/* <Map
                {...viewState}
                style={{ width: '50', height: '50vh' }}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/street-v9"
                mapboxAccessToken={token}
            >

                <Marker longitude={lng} latitude={lat} anchor="bottom" >
                    <Stack justifyContent="center" alignItems="center" onClick={() => setShowPopup(true)}>

                        <img className='mapbox-img' src={current ? current?.condition.icon : ''} alt="weather logo" />
                        <Typography color='primary' variant='h6'> {fahrenheit ? `${current?.temp_f}°F` : `${current?.temp_c}°C`} </Typography>
                    </Stack>
                </Marker>


                <Geocoder />
                <GeolocateControl position='bottom-right' ref={geolocateControlRef} />
                <NavigationControl position='bottom-right' />
                {showPopup && (
                    <Popup longitude={lng} latitude={lat}
                        anchor="top"
                        closeOnClick={false}
                        onClose={() => setShowPopup(false)}>
                        You are here
                    </Popup>)}

                    
                <Button onClick={() => { addSaves(location); dispatch(setItemSaved(!savedToLocal)) }} sx={savedToLocal ? { margin: '0 !important', backgroundColor: 'green' } : { margin: '0 !important', backgroundColor: '' }} variant={'contained'}> {savedToLocal ? 'Location Saved' : 'Save location'} </Button>
                </Map > */}







        </>


    )
}

export default Mapbox
