import Ember from 'ember';

export default Ember.Controller.extend({
	application: Ember.inject.controller('application'),
	actions: {
		login(){
			let user = this.get('model');
			user.login().then((result) => {
				user.setProperties({
					name: result.name,
					email: user.get('email'),
					gravatar_hash: result.gravatar_hash,
					password: null
				});
				result.tokens.forEach((item) => {
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
					this.setProperties('currentUser', user);
					this.get('application').set('currentUser', savedUser);
					this.get('application').setToken().then(() => {
						this.transitionToRoute('/index');
					}).catch((error) => {
							alert()
					});
				});
				console.log(result);
			});
		}
	}
});

