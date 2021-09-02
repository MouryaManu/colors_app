import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';

class App extends Component {
  render() {
   return (
     <div>
       <Switch>
       <Route exact path="/" render={() => <h1>Palette list comes here</h1>} />
       <Route exact path="/palette/:id" render={()=> <h1>Individual Palette is here!</h1>}  />
       </Switch>
     {/* <Palette palette= {generatePalette(seedColors[3])} /> */}

    </div>
   );
 }
}

export default App;
