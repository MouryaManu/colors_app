import React, { Component } from 'react'
import ColorBox from './ColorBox'
import Navbar from './Navbar';
import './Palette.css';


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
                <Navbar level={this.state.level} levelChange={this.levelChange} />
                <div className="Palette-colors">
                    {colorBoxes}
                 
                </div>

             

            </div>
        )
    }
}

export default Palette;