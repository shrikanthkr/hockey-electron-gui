import Ember from 'ember';
import ElectronMixin from '../mixins/electron'
export default Ember.Component.extend(ElectronMixin, {

	actions: {
		save: function() {
			let params = {};
			params.cwd = this.get('path');
			let buildTypes = this.getCommandList();
			let output = this.spawn("./gradlew",buildTypes, params);

			output.stdout.on('data', (data) => {
				this.set('stdOut', this.get('stdOut') + data);
			});

			output.stderr.on('data', (data) => {
				this.set('stdErr', this.get('stdErr') + data);
			});

			output.on('close', (code) => {
				this.set('stdEnd', "child process exited with code" + code);
			});

			output.on('error', (code) => {
				this.set('stdEnd', "child process exited with code" + code);
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
	},
});
