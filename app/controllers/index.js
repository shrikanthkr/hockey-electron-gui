import Ember from 'ember';
import ApplicationController from './application';
import ElectronMixin from '../mixins/electron'
export default  ApplicationController.extend(ElectronMixin, {
	path: "",
	buildTypes: [{id: 0, name: "Stage"},{id: 1, name: "QA"},{id: 2, name: "RC"}],
	actions: {
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
