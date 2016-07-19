import Ember from 'ember';

export default Ember.Component.extend({
	url: null,
	didInsertElement: function() {
		console.log('ImageUploadComponent.didInsertElement');

		Ember.run.scheduleOnce('afterRender', this, () => {
        // perform jQuery function here;
        let token  = window.localStorage.getItem('auth_token');
        var myDropzone = new Dropzone('#'+this.elementId+"-dropzone", { 
        	paramName: 'ipa', 
        	url: this.get('url'),
        	headers: { 'X-HockeyAppToken': token }

        });
      });
	}
});
