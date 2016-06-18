import Ember from 'ember';



export default Ember.Controller.extend({
	currentUser: null,
	token: window.localStorage.getItem('auth_token'),
	tokenChanged: function(){
		this.setToken();
	}.observes('currentUser'),
	setToken(){
		let user = this.get('currentUser');
			user.get('tokens').then((tokens) => {
				tokens.forEach((token, index) => {
					if(token.get('rights') == 0){
						this.set('token',token.get('token'));
						window.localStorage.setItem('auth_token',  token.get('token'));
					}
				});
		});
	},
	init() {
		this.setupAjax();
	},
	setupAjax() {
		$.ajaxSetup({
			headers: {
				'X-HockeyAppToken': this.get('token')
			}
		});
	}
});
