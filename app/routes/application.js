import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel(){
		this.store.findAll('user').then((users)=>{
			let loggedIn = false;
			users.forEach((user, index) => {
				console.log(user);
				if(user){
					this.controllerFor('application').set('currentUser', user);
					this.transitionTo('/index');
					loggedIn = true;
					return;
				}
			});
			if(loggedIn == false){
				this.transitionTo('/');
			}
		});
	}
});
