/*
 * Author: Austin Gibson
 * Index.js
 * Modified for lab09.  Split into modules
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';
import CommentBox from './commentBox'

//import '../css/base.css';

ReactDOM.render(
	<CommentBox url="/api/comments" pollInterval={2000} />,
	document.getElementById('content')
);