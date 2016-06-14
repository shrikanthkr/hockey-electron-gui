import Ember from 'ember';
import ElectronMixin from '../mixins/electron'
export default Ember.Component.extend(ElectronMixin, {
	success: true,
	is_loading: false,
	pid: 0,
	actions: {
		build: function() {
			this.set('is_loading', true);
			this.set('success', true);
			let params = {};
			params.cwd = this.get('path');
			let command = this.get('type').command;
			let buildTypes = [];
			buildTypes.push(command);
			let output = this.spawn("./gradlew",buildTypes, params);
			this.set('pid', output.pid);
			output.stdout.on('data', (data) => {
				this.set('stdOut', data);
			});

			output.stderr.on('data', (data) => {
				this.set('stdErr', this.get('stdErr') + data);
			});

			output.on('close', (code) => {
				this.set('stdEnd', "child process exited with code" + code);
				this.set('is_loading', false);
			});

			output.on('error', (code) => {
				this.set('stdEnd', "child process exited with code" + code);
				this.set('success', (code === 0) );
				this.set('is_loading', false);
			});

		},
	}

});
