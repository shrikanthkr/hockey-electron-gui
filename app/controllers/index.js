import Ember from 'ember';
import ApplicationController from './application';
import ElectronMixin from '../mixins/electron'
export default  ApplicationController.extend(ElectronMixin, {
	path: "",
	success: true,
	cleaning: false,
	buildTypes: [{id: 0, name: "Stage"},{id: 1, name: "QA"},{id: 2, name: "RC"}],
	actions: {
		open: function() {
			this.get('dialog').showOpenDialog({properties: ['openDirectory']}, (paths) => {
				if(paths){
					this.set('path', paths[0]);
					console.log(paths);
				}
			})
		},
		clean: function() {
			let params = {};
			params.cwd = this.get('path');
			this.set('cleaning', true);
			this.execute("./gradlew clean", params, (error, stdout, stderr) => {
				if(error || stderr){
					this.set('success', false);
					this.set('stdout', error || stderr);
				}else{
					this.set('success', true);
					this.set('stdout', stdout);
				}
				this.set('cleaning', false);
			});
		}
	}
});
