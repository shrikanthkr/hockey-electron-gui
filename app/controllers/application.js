import Ember from 'ember';

const electron = requireNode('electron');
const child_process = require('child_process');

export default Ember.Controller.extend({
	process: window.processNode,
	electron: electron,
	child_process: child_process,
	execute: function(command, callback){
		var output = this.child_process.exec(command,callback);
	}
});
