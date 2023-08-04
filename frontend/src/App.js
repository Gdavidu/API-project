import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/AllSpots";
import GetSpotDetails from "./components/SpotDetails";
import SpotForm from "./components/SpotForm";
import GetCurrentSpots from "./components/ManageSpots";
import UpdateSpotForm from "./components/UpdateSpotForm";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // const spot = {

  // }
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/'>
            <GetAllSpots />
          </Route>
          <Route exact path='/:id'>
            <GetSpotDetails/>
          </Route>
          <Route exact path='/spots/new'>
          <SpotForm/>
          </Route>
          <Route exact path='/spots/current'>
            <GetCurrentSpots user={sessionUser}/>
          </Route>
          <Route exact path='/spots/update/:id'>
            <UpdateSpotForm/>
          </Route>
          <Route>
            <h1>Route Could Not Be Found</h1>
          </Route>
        </Switch>}
    </>
  );
}

export default App;
