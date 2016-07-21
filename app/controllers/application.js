import Ember from 'ember';



export default Ember.Controller.extend({
	currentUser: null,
	token: window.localStorage.getItem('auth_token'),
	tokenChanged: function(){
		this.setToken();
	}.observes('currentUser'),
	setToken(){
		return new Promise((resolve, reject) =>  {
			let user = this.get('currentUser');
			let isTokenAvailable = false;
			user.get('tokens').then((tokens) => {
				tokens.forEach((token, index) => {
					if(token.get('rights') == 0){
						this.set('token',token.get('token'));
						window.localStorage.setItem('auth_token',  token.get('token'));
						isTokenAvailable = true;
						resolve(user);
						retutn;
					}
				});
				if(!isTokenAvailable){
						reject({message: 'Please create a token with full access'});
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
