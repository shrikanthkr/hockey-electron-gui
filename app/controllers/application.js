import Ember from 'ember';

const electron = requireNode('electron');
const child_process = requireNode('child_process');
const {dialog} = requireNode('electron').remote;

export default Ember.Controller.extend({
	process: window.processNode,
	electron: electron,
	child_process: child_process,
	dialog: dialog,
	execute: function(command, options, callback){
		var output = this.child_process.exec(command,options, callback);
	},
	spawn :function(command, args, params) {
		return this.child_process.spawn(command, args, params);
	}
});
