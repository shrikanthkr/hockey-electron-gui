import Ember from 'ember';
import ApplicationController from './application';

export default  ApplicationController.extend({
	path: "",
	actions: {
		save: function() {
			let params = {};
			params.cwd = this.get('path');
			let output = this.spawn("./gradlew",['assembleStage'], params);

			output.stdout.on('data', (data) => {
				console.log(`stdout: ${data}`);
			});

			output.stderr.on('data', (data) => {
				console.log(`stderr: ${data}`);
			});

			output.on('close', (code) => {
				console.log(`child process exited with code ${code}`);
			});

		},
		clean: function() {
			let params = {};
			params.cwd = this.get('path');
			this.execute("./gradlew clean", params, (error, stdout, stderr) => {
				console.log(stdout);
				console.log("ERROR:   " + error);
				console.log("STDERR:"  + stderr);
			});
		},
		open: function() {
			this.get('dialog').showOpenDialog({properties: ['openDirectory']}, (paths) => {
				if(paths){
					this.set('path', paths[0]);
					console.log(paths);
				}
			})
		}
	}
});
