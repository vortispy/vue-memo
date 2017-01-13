const editpage = {
	template:
		'<div>'+
		'<input type="text" v-model="title"/><textarea v-model="memo"/>'+
		'<button v-on:click="saveMemo">save</button>'+
		'</div>',
	data: function (){
		return {
			title: '',
			memo: ''
		};
	},
	methods: {
		saveMemo: function () {
			return
		}
	}
};
const routes = [
	{ path: '/create', component: editpage }
];
const router = new VueRouter({
	routes
});
const app = new Vue({
	router,
	el: '#app',
	data: {
		message: 'hello'
	}
});
