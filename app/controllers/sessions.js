import Ember from 'ember';

export default Ember.Controller.extend({
	reset(){

	},
	actions: {
		login(response){
			let user = this.get('model');
			user.login().then((result) => {
				user.setProperties({
					name: result.name,
					email: user.get('email'),
					gravatar_hash: result.gravatar_hash,
					password: null
				});
				result.tokens.forEach((item,index) => {
					let token  = this.store.createRecord('token');
					token.setProperties({
						token: item.token,
						app_id: item.app_id,
						name: item.name,
						rights: item.rights});

						user.get('tokens').pushObject(token);
				});
				user.save().then((savedUser) => {
					savedUser.get('tokens').invoke('save');
					this.transitionToRoute('/index');
				});
				
				console.log(result);
			});
		}
	}
});

