import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      palettes: seedColors
    }
    this.savePalette=this.savePalette.bind(this);
    this.findPalette=this.findPalette.bind(this);
  }

  savePalette(newPalette) {
    this.setState({
      palettes: [...this.state.palettes, newPalette]
    })
  }



  findPalette(id) {
    return this.state.palettes.find(function(Palette) {
      return Palette.id === id;
    });
  }
  render() {
   return (
     <div>
       <Switch>
      
      <Route exact
      path='/palette/new'
      render={routeProps=> <NewPaletteForm 
        savePalette={this.savePalette} 
        {...routeProps}
        palettes={this.state.palettes} /> } 
      />
      
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
       render={routeProps => <PaletteList palettes={this.state.palettes} {...routeProps} /> } 
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
