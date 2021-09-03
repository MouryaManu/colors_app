import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';

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
       path="/palette/:paletteId/:colorId"
       render={routeProps => (
        <SingleColorPalette
        colorId={routeProps.match.params.colorId}
        palette={generatePalette(
          this.findPalette(routeProps.match.params.paletteId)
        )} />
        )}  
       />


       <Route exact 
       path="/" 
       render={routeProps => <PaletteList palettes={seedColors} {...routeProps} /> } 
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
