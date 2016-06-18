import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
	token: attr(),
	app_id: attr(),
	app_id: attr(),
	rights: attr()
});
