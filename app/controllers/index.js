import Ember from 'ember';
import ApplicationController from './application';

export default  ApplicationController.extend({
	path: "",
	buildTypes: [{id: 0, name: "Stage"},{id: 1, name: "QA"},{id: 2, name: "RC"}],
	selectedTypes: [],
	stdOut: "",
	stdErr: "",
	stdEnd: "",
	getCommandList: function(){
		let types = [];
		this.selectedTypes.forEach(function(item, index){
			switch(item.id){
				case 0:
				types.push('assembleStage');
				break;
				case 1:
				types.push('assembleQA');
				break;
				case 2:
				types.push('assembleRC');
				break;
			}
		});
		return types;
	}

});
