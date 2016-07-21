import Ember from 'ember';
import ElectronMixin from '../mixins/electron'
export default Ember.Controller.extend(ElectronMixin, {
  application: Ember.inject.controller('application'),
  path: '',
  success: true,
  cleaning: false,
  buildTypes: [],
  isPathEmpty: Ember.computed('path', function() {
    return this.get('path') === '';
  }),
  actions: {
    open() {
      if (this.get('isPathEmpty')) {
        this.get('dialog').showOpenDialog({
          properties: ['openDirectory']
        }, (paths) => {
          if (paths) {
            this.set('path', paths[0]);
            let params = {};
            params.cwd = this.get('path');
            //
            this.execute('./gradlew tasks', params, (error, stdout, stderr) => {
              this.parseTask(stdout);
              this.set('path', '');
            })
          }
        });
      }
    },
    clean() {
      let params = {};
      params.cwd = this.get('path');
      this.set('cleaning', true);
      this.execute("./gradlew clean", params, (error, stdout, stderr) => {
        if (error || stderr) {
          this.set('success', false);
          this.set('stdout', error || stderr);
        } else {
          this.set('success', true);
          this.set('stdout', stdout);
        }
        this.set('cleaning', false);
      });
    }
  },
  parseTask(tasks) {
    let prefix = 'assemble';
    let pattern = /assemble(RC|Stage|Qa|Release|Debug)/ig;
    let arr = tasks.match(pattern);
    if (arr) {
      arr.forEach((item, index) => {
        let name = item.slice(prefix.length);
        let buildType = {
          id: index,
          name: name,
          command: item
        }
        this.get('buildTypes').pushObject(buildType);
      });
    }
  }
});
