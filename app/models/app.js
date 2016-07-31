import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
	builds: hasMany('build'),
	title: attr(),
	platform: attr(),
	company: attr(),
	role: attr(),
	folder: attr()
});
