import Ember from 'ember';
const electron = require('electron');
const child_process = require('child_process');
const {dialog} = require('electron').remote;

export default Ember.Mixin.create({
	process: window.processNode,
	electron: electron,
	child_process: child_process,
	dialog: dialog,
	execute: function(command, options, callback){
		return this.child_process.exec(command,options, callback);
	},
	spawn :function(command, args, params) {
		return this.child_process.spawn(command, args, params);
	}
});
