import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		login(){
			let user = this.get('user');
			user.login().then((result) => {
				user.tokens = result.tokens;
				user.name = result.name;
				user.email = user.email;
				user.gravatar_hash = result.gravatar_hash;
				user.password= null;
				user.save();
				this.sendAction('to_index');
				console.log(result);
			});
		}
	}
});
