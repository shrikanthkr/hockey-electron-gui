import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel(){
		
	},
	model(params){
		return this.store.findRecord('app', params.id);
	}
});
