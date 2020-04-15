import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default class App extends React.Component {
    //other logic
    render() {
        return (
            <Loader
                type="ThreeDots"
                color="white"
                height={30}
                width={30}
            //   timeout={3000} //3 secs

            />
        );
    }
}