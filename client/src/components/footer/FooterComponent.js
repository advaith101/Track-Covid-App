import React from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import EsraLogo from '../../assets/logolight.png'
import { Avatar } from '@material-ui/core';


function FooterComponent() {
    return (
        <footer style={{position:"relative",
        bottom: 0,
   width:"100%",
   height:"45px",
   background:"#3c3c3c",
	marginBottom:"0"}}>
        <img src={EsraLogo} style={{width:"88px", height:"35px", marginTop:"5px"}}/>
        </footer>
    );
}
export default FooterComponent;



