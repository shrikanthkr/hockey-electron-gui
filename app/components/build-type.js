import Ember from 'ember';
import ElectronMixin from '../mixins/electron'
export default Ember.Component.extend(ElectronMixin, {
	success: true,
	is_loading: false,
	actions: {
		build: function() {
			this.set('is_loading', true);
			this.set('success', true);
			let params = {};
			params.cwd = this.get('path');
			let id = this.get('type').id;
			let buildTypes = this.getCommand(id);
			let output = this.spawn("./gradlew",buildTypes, params);

			output.stdout.on('data', (data) => {
				this.set('stdOut', data);
			});

			output.stderr.on('data', (data) => {
				this.set('stdErr', this.get('stdErr') + data);
			});

			output.on('close', (code) => {
				this.set('stdEnd', "child process exited with code" + code);
			});

			output.on('error', (code) => {
				this.set('stdEnd', "child process exited with code" + code);
				this.set('success', (code === 0) );
				this.set('is_loading', false);
			});

		},
	},
	getCommand: function(id){
		let types = [];
			switch(id){
				case 0:
				types.push('assembleStage');
				break;
				case 1:
				types.push('assembleQA');
				break;
				case 2:
				types.push('assembleRC');
				break;
			}
		return types;
	}

});
