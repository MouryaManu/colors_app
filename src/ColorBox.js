import React, { Component } from 'react'
import './ColorBox.css';

class ColorBox extends Component {
    render() {
        return (
            <div style={{background: this.props.background}} className="ColorBox">
                {this.props.name}
                <span>MORE</span>
                
                
                

            </div>
        )
    }
}

export default ColorBox;