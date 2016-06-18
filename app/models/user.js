import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
	apps: hasMany('app'),
	email: attr(),
	password: attr(),
	gravatar_hash: attr(),
	name: attr(),
	tokens: hasMany('token'),
	login() {
		return $.ajax({
			url: 'https://rink.hockeyapp.net/api/2/auth_tokens',
			headers: {"Authorization":  "Basic " + btoa(this.get('email')+ ":" + this.get('password'))}
		});
	},
	getApps() {
		return $.ajax({
			url: 'https://rink.hockeyapp.net/api/2/apps',
		});
	}
});
