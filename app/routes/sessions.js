import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel(){
		return this.store.findAll('user').then((users)=>{
			let loggedIn = false;
			let user = users.get('firstObject');
			if(user){
				this.controllerFor('application').set('currentUser', user);
				this.transitionTo('apps');
				return;
			}
		});
	},
	model(){
		return this.store.createRecord('user');
	},
});
