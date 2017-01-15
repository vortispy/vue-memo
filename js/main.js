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
const memoStore = {
	memos: memoStorage.fetch(),
	createMemo (title, text, created_at, uid){
		this.memos.push({
			title,
			text,
			created_at,
			uid,
		});
	},
	updateMemo (title, text, created_at, uid){
		const index = this.seachWithUid(uid);
		this.memos.splice(index, 1, {title, text, created_at, uid});
	},
	seachWithUid (uid){
		this.memos.forEach(value, index => {
			if (value.uid === uid){
				return index;
			}
		});
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
