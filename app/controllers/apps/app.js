import Ember from 'ember';
import ElectronMixin from 'hockey-ember/mixins/electron'
export default Ember.Controller.extend(ElectronMixin, {
	application: Ember.inject.controller('application'),
  path: '',
  isFileSelected: false,
  success: true,
  cleaning: false,
  buildTypes: [],
  pathChanged: Ember.observer('path', function() {
    if (this.get('path') === '') {
      this.set('isFileSelected', false);
    } else {
      this.set('isFileSelected', true);
    }
  }),
  actions: {
    open() {
      this.set('path', '');
      if (!this.get('isFileSelected')) {
        this.get('dialog').showOpenDialog({
          properties: ['openDirectory']
        }, (paths) => {
          if (paths) {
            this.set('path', paths[0]);
            let params = {};
            params.cwd = this.get('path');
            this.set('buildTypes', []);
            //
            this.execute('./gradlew tasks', params, (error, stdout, stderr) => {
              this.parseTask(stdout);
              this.get('model').set('folder', this.get('path'));
              this.get('model').save();
              this.set('isFileSelected', false);
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
