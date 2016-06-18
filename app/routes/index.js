import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.findAll('user');
	},
	actions: {
		logout(){
			this.store.findAll('user').then((users)=> {
				users.forEach((user, item) => {
					console.log(user.get('email'));
					user.deleteRecord();
					user.save()
				});
			});
		}
	}
});
