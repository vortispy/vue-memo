const STRAGE_KEY = "vue-memo";
let memoStorage = {
	fetch: function (){
		let memos = JSON.parse(localStorage.getItem(STRAGE_KEY) || '[]');
		return memos;
	},
	save: function (memos){
		localStorage.setItem(STRAGE_KEY, JSON.stringify(memos));
	}
};
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
