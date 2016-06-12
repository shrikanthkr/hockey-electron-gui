import Ember from 'ember';
import ApplicationController from './application';

export default  ApplicationController.extend({
	actions: {
		save: function() {
			console.log(this.get('process'));
			alert();
		}
	}
});
