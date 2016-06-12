import Ember from 'ember';
import ApplicationController from './application';

export default  ApplicationController.extend({
	actions: {
		save: function() {
			this.execute("ls", (error, stdout, stderr) => {
				console.log(stdout);
			});
		}
	}
});
