import React, { Component } from 'react'
import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class ColorBox extends Component {
    render() {
        return (
            <CopyToClipboard text={this.props.background}>
            <div style={{background: this.props.background}} className="ColorBox">
                <div className="copy-container">
                    <div className="box-content">
                        <span>{this.props.name}</span>
                    </div>
                    <button className='copy-button'>Copy!</button>
                    <div>
                        <span className='more-button'>More</span>
                    </div>
                </div>
            </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;