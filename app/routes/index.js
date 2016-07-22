import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel() {
    let user = this.controllerFor('application').get('currentUser');
    if (user) {
      this.set('user', user);
    } else {
      this.transitionTo('/');
    }

  },
  model() {
    return this.get('user').getApps();
  },
  setupController(controller, model) {
    controller.set('user', this.get('user'));
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
