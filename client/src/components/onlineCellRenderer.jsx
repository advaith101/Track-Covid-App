import React, { Component } from 'react';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import statusonline from '../assets/statusonline.png';
import statusoffline from '../assets/statusoffline.png';
import statusidle from '../assets/statusidle.png';

export default class onlineCellRenderer {
  constructor() {
  }
// init method gets the details of the cell to be renderer
init(params) {
    this.eGui= document.createElement('span');
      var text='';
// one star for each medal
switch (params.value) {
  case 2:
    var online = document.createElement('img');
    online.src = statusonline;
    this.eGui.appendChild(online);
    break;
  case 1:
    var idle = document.createElement('img');
    idle.src = statusidle;
    this.eGui.appendChild(idle);
    break;
  case 0:
    var offline = document.createElement('img');
    var lastseen = document.createElement('span');
    offline.src = statusoffline;
    this.eGui.appendChild(offline);
    break;
  }

}
getGui() {
  return this.eGui;
}
}