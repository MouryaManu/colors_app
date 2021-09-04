import React, { Component } from 'react'
import ColorBox from './ColorBox'
import Navbar from './Navbar';
import './Palette.css';


class Palette extends Component {
    constructor(props) {
        super(props);
        this.state={
            level: 500,
            format: "hex"
        }
        this.levelChange=this.levelChange.bind(this);
        this.changeFormat=this.changeFormat.bind(this);
    }

    levelChange(level) {
        this.setState({level});
    }

    changeFormat(val) {
        this.setState({
            format: val
        })
    }



    render() {
        const {colors, paletteName,emoji,id} = this.props.palette;
        const {format} = this.state;
        const colorBoxes = colors[this.state.level].map(color => (
            <ColorBox background={color[format]} 
            name={color.name} 
            key={color.id} 
            id={color.id} 
            paletteId={id}
            moreUrl={`/palette/${id}/${color.id}`}
            showLink
            />
        ))
        return (
            <div className="Palette">
                <Navbar level={this.state.level} 
                levelChange={this.levelChange}
                handleChange={this.changeFormat} 
                showingAllColors
                />
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <footer className='palette-footer'>
                  {paletteName}
                  <span className='emoji'>
                      {emoji}
                  </span>
                </footer>
            </div>
        )
    }
}

export default Palette;