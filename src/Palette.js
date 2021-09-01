import React, { Component } from 'react'
import ColorBox from './ColorBox'
import './Palette.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


class Palette extends Component {
    constructor(props) {
        super(props);
        this.state={
            level: 500
        }
        this.levelChange=this.levelChange.bind(this);
    }

    levelChange(level) {
        this.setState({level});
    }



    render() {
        const {colors} = this.props.palette;
        const colorBoxes = colors[this.state.level].map(color => (
            <ColorBox background={color.hex} name={color.name} />
        ))
        return (
            <div className="Palette">
                <Slider defaultValue={this.state.level} min={100} max={900} step={100} onAfterChange={this.levelChange} />
                <div className="Palette-colors">
                    {colorBoxes}
                 
                </div>

             

            </div>
        )
    }
}

export default Palette;