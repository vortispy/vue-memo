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
		let ret = -1;
		this.memos.forEach((value, index) => {
			if (value.uid === uid){
				ret = index
				return;
			}
		});
		return ret;
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
		'<button v-on:click="saveMemo(title, memo)">save</button>'+
		'</div>',
	data: function (){
		let uid = 'uid' in this.$route.params ? this.$route.params.uid : '';
		let title = '', memo = '';
		
		if (uid !== ''){
			let index = memoStore.searchWithUid(uid);
			title = memoStore.memos[index].title;
			memo = memoStore.memos[index].text;
		}
		return {title, memo, uid};
	},
	methods: {
		saveMemo: function (title, memo) {
			let created_at = new Date().toJSON();

			if (title === '' && memo === ''){
				return;
			}
			if(this.uid === ''){
				this.createMemo(title, memo, created_at);
			} else{
				this.updateMemo(title, memo, created_at, this.uid);
			}
			memoStorage.save(memoStore.memos);
			this.$router.replace({ name: 'update', params: { uid: this.uid }});
			return;
		},
		createMemo: function (title, memo, created_at){
			this.uid = this.generateUid();
			memoStore.createMemo(title, memo, created_at, this.uid);
			return;
		},
		updateMemo: function (title, memo, created_at, uid){
			memoStore.updateMemo(title, memo, created_at, uid);
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
const memolist = {
	template:
		'<div>'+
		'<ul>'+
		'<li v-for="memo in memos">'+
		'<router-link :to="{ name: \'update\', params: { uid: memo.uid }}">'+
		'{{ memo.title }}'+
		'</router-link>'+
		'<span>{{ memo.created_at }}</span>'+
		'</li>'+
		'</div>',
	data: function (){
		return {
			memos: memoStore.memos
		};
	}
};
const routes = [
	{ path: '/', name: 'home', component: memolist },
	{ path: '/edit/:uid', name: 'update', component: editpage },
	{ path: '/edit', name: 'create', component: editpage }
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
