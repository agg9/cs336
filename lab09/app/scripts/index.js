/*
 * Author: Austin Gibson
 * Index.js
 * Modified for lab09.  Split into modules
 */

import React from 'react';
import ReactDOM from 'react-dom';

import CommentBox from './commentBox';


//getting error when trying to import css file..
//import '../css/base.css';

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000}/>,
    document.getElementById('content')
);