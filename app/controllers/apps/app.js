import Ember from 'ember';
import ElectronMixin from 'hockey-ember/mixins/electron'
export default Ember.Controller.extend(ElectronMixin, {
	application: Ember.inject.controller('application'),
	isFileSelected: false,
	success: true,
	cleaning: false,
	buildTypes: [],
	dependency: function () {
		let app  = this.get('model');	
		if(app && app.get('folder')){
			this.getTasks();
		}
	}.observes('model'),
	actions: {
		open() {
			let app  = this.get('model');	
			this.get('dialog').showOpenDialog({
				properties: ['openDirectory']
			}, (paths) => {
				if (paths) {
					let app  = this.get('model');	
					app.set('folder', paths[0]);
					this.getTasks(); 
				}
			});
		},
		clean() {
			let params = {};
			let app  = this.get('model');
			params.cwd = app.get('folder');
			this.set('cleaning', true);
			this.execute("./gradlew clean", params, (error, stdout, stderr) => {
				if (error || stderr) {
					this.set('success', false);
					this.set('stdout', error || stderr);
				} else {
					this.set('success', true);
					this.set('stdout', stdout);
				}
				this.set('cleaning', false);
			});
		}
	},
	getTasks(){
		let params = {};
		let app  = this.get('model');	
		params.cwd = app.get('folder');
		this.set('buildTypes', []);
		this.execute('./gradlew tasks', params, (error, stdout, stderr) => {
			if(stderr){

			}else{
				this.parseTask(stdout);
				this.get('model').save();
			}
		})
	},
	parseTask(tasks) {
		let prefix = 'assemble';
		let pattern = /assemble(RC|Stage|Qa|Release|Debug)/ig;
		let arr = tasks.match(pattern);
		if (arr) {
			arr.forEach((item, index) => {
				let name = item.slice(prefix.length);
				let buildType = {
					id: index,
					name: name,
					command: item
				}
				this.get('buildTypes').pushObject(buildType);
			});
		}
	}
});
