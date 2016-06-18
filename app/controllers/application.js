import Ember from 'ember';



export default Ember.Controller.extend({
	currentUser: null,
	token: null,
	tokenChanged: function(){
		let user = this.get('currentUser');
		user.get('tokens').then((tokens) => {
			tokens.forEach((token, index) => {
				if(token.get('rights') == 0){
					this.setupAjax(token.get('token'));
					this.set('token', token.get('token'));
				}
			});
		});
	}.observes('currentUser'),
	setupAjax(token) {
		$.ajaxSetup({
			headers: {
				'X-HockeyAppToken': token
			}
		});
	}
});
