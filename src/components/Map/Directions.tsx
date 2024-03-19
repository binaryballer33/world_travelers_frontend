// TODO: GET DIRECTIONS INFORMATION ON THE MAP
// import { Box, List, ListItem, Typography } from '@mui/material';
// import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
// import { useEffect, useState } from 'react';
// import Loading from '../../state_indicators/Loading';

// interface IDirectionsProps {
//     origin: string,
//     destination: string
//     travelMode: google.maps.TravelMode,
// }

// /* Component that is used to get routes from A to B */
// const Directions = ({ origin, destination, travelMode }: IDirectionsProps) => {
//     /* Hooks */
//     const map = useMap(); // get map instance
//     const routesLibrary = useMapsLibrary("routes"); // get the routes library

//     /* State  */
//     const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>(); // gets the directions from server
//     const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>(); // renders the directions on the map
//     const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>(); // the routes
//     const [routeIndex, setRouteIndex] = useState(0); // the routes

//     /* Variables */
//     const selected = routes?.[routeIndex]  // get the selected route a user that changes when a user clicks
//     const leg = selected?.legs[0] //  get the trip leg information

//     // initialize the directions service and renderer
//     useEffect(() => {
//         if (!map || !routesLibrary) return;

//         setDirectionsService(new routesLibrary.DirectionsService())
//         setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map: map })) // so it knows what map to render to

//     }, [map, routesLibrary])

//     // get directions and set the directions renderer
//     useEffect(() => {
//         if (!directionsService || !directionsRenderer) return;

//         directionsService.route({
//             origin: origin || "Tampa",
//             destination: destination || "2307 W Saint Joseph St, Tampa, FL 33607",
//             travelMode: travelMode || google.maps.TravelMode.DRIVING,
//             provideRouteAlternatives: true
//         }).then((response) => {
//             directionsRenderer.setDirections(response)
//             setRoutes(response.routes)

//         })
//     }, [directionsService, directionsRenderer])

//     // when the user selects a different route from the list of routes, set the route index
//     useEffect(() => {
//         if (!directionsRenderer) return;
//         directionsRenderer.setRouteIndex(routeIndex)
//     }, [routeIndex, directionsRenderer])

//     if (!leg) return <Loading />;

//     return (
//         <Box>
//             {/* Render Currently Selected Route Information */}
//             <Typography variant="h5" color="primary">{selected.summary}</Typography>
//             <Typography variant="body2" color="primary">{leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}</Typography>
//             <Typography variant="h5" color="primary">{leg.distance?.text}</Typography>
//             <Typography variant="h5" color="primary">{leg.duration?.text}</Typography>

//             <Typography variant="h5" color="primary">Other Routes</Typography>

//             {/* Render the other route options that I user can click on a get directions to */}
//             <List>
//                 {routes?.map((route, index) => (
//                     <ListItem key={index} onClick={() => setRouteIndex(index)}>{route.summary}</ListItem>
//                 ))}
//             </List>
//         </Box>
//     )
// };

// export default Directions;
