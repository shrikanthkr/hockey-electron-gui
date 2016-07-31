import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel() {
    let user = this.controllerFor('application').get('currentUser');
    if (user) {
      this.set('user', user);
    } else {
      this.transitionTo('/sessions');
    }

  },
  model() {
    let user = this.get('user');
    return user.getApps().then((data) => {
        data.apps.forEach((item, index) => {
          let app  = this.store.createRecord('app');
          app.setProperties({
            id: item.id,
            title: item.title,
            platform: item.platform,
            company: item.company,
            role: item.role});
          user.get('apps').pushObject(app);
        });
        user.get('apps').invoke('save');
        return user;
    });
  },

  setupController(controller, model) {
    controller.set('user',model);

  },
  actions: {
    logout() {
      this.store.findAll('user').then((users) => {
        users.forEach((user, item) => {
          console.log(user.get('email'));
          user.deleteRecord();
          user.save().then(() => {
            this.transitionTo('/');
          });
          window.localStorage.clear()
          this.controllerFor('application').setupAjax();
        });
      });
    }
  }
});
