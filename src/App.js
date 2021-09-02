import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';

class App extends Component {
  findPalette(id) {
    return seedColors.find(function(Palette) {
      return Palette.id === id;
    });
  }
  render() {
   return (
     <div>
       <Switch>
       <Route exact 
       path="/" 
       render={() => <PaletteList palettes={seedColors} /> } 
       />

       <Route exact 
       path="/palette/:id" 
       render={routeProps => (
         <Palette
         palette={generatePalette(
           this.findPalette(routeProps.match.params.id)
         )} />
       )}  
       />

       </Switch>
     {/* <Palette palette= {generatePalette(seedColors[3])} /> */}

    </div>
   );
 }
}

export default App;
