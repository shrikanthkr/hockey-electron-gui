import Ember from 'ember';
import ElectronMixin from '../mixins/electron'
export default Ember.Component.extend(ElectronMixin, {
	success: false,
	error: false,
	is_loading: false,
	prefix: 'assemble',
	pid: 0,
	actions: {
		build: function() {
			this.set('is_loading', true);
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
				this.set('success', (code === 0) );
				this.set('error', !(code === 0) );
			});

			output.on('error', (code) => {
				this.set('stdEnd', "child process exited with code" + code);
				this.set('success', (code === 0) );
				this.set('error', !(code === 0) );
				this.set('is_loading', false);
			});

		},
		upload() {
			this.get('dialog').showOpenDialog({properties: ['openFile']}, (paths) => {
				if(paths){
					let filePath = paths[0];
					console.log(filePath);
					$.ajax({
						url: 'https://rink.hockeyapp.net/api/2/apps/upload',
						method: 'post',
						contentType: 'multipart/form-data',
						data:{
							ipa: filePath
						}
					}).then(()=>{}, (error) => {
						console.log(error)
					});
				}
			})
		}
	}

});
