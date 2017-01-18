const STRAGE_KEY = "vue-memo";
const UID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
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
	uidchars: UID_CHARS,
	createMemo (title, text, created_at, uid){
		this.memos.push({
			title,
			text,
			created_at,
			uid,
		});
	},
	updateMemo (title, text, created_at, uid){
		const index = this.searchWithUid(uid);
		this.memos.splice(index, 1, {title, text, created_at, uid});
	},
	searchWithUid (uid){
		this.memos.forEach((value, index) => {
			if (value.uid === uid){
				return index;
			}
		});
		return -1;
	},
	generateUid(){
		let uid = "xxxxxxxx"; // uid length is 8.
		return uid.replace(/x/g, () =>{
			let i = Math.random() * this.uidchars.length | 0;
			return this.uidchars[i];
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
			let title = this.title;
			let memo = this.memo;
			let uid = this.generateUid();
			let created_at = new Date().toJSON();

			if (title === '' && memo === ''){
				return;
			}
			memoStore.createMemo(title, memo, created_at, uid);
			memoStorage.save(memoStore.memos);
			this.$router.push('/');
			return;
		},
		generateUid: function (){
			let uid = memoStore.generateUid();
			while(memoStore.searchWithUid(uid) !== -1){
				uid = memoStore.generateUid();
			}
			return uid;
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
	}
});
