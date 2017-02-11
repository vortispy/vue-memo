<template>
	<div>
		<div class="form-group">
			<label for="title">Title</label>
			<button v-on:click="deleteMemo(uid)" type="button" class="btn btn-xs right">delete</button>
			<input type="text" v-model="title" id="title" placeholder="Title" class="form-control"/>
		</div>
		<div class="form-group">
			<label for="memo">Memo</label>
			<textarea v-model="memo" id="memo" placeholder="Input your memo" rows="10" class="form-control"/>
		</div>
		<button v-on:click="saveMemo(title, memo)" type="button" class="btn btn-default">save</button>
	</div>
</template>

<script>
import {memoStore} from './memostore.js'

export default {
	data: function (){
		let uid = 'uid' in this.$route.params ? this.$route.params.uid : '';
		let title = '', memo = '';
		
		if (uid !== ''){
			let index = memoStore.searchWithUid(uid);
			if(index !== -1){
				title = memoStore.memos[index].title;
				memo = memoStore.memos[index].text;
			}
		}
		return {memoStore, title, memo, uid};
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
			this.memoStore.saveMemo();
			this.$router.replace({ name: 'update', params: { uid: this.uid }});
			return;
		},
		deleteMemo: function (uid){
			memoStore.deleteMemo(uid);
			memoStore.saveMemo();
			this.$router.push({ name: 'home' });
		},
		createMemo: function (title, memo, created_at){
			this.uid = this.generateUid();
			this.memoStore.createMemo(title, memo, created_at, this.uid);
			return;
		},
		updateMemo: function (title, memo, created_at, uid){
			this.memoStore.updateMemo(title, memo, created_at, uid);
			return;
		},
		generateUid: function (){
			let uid = this.memoStore.generateUid();
			while(memoStore.searchWithUid(uid) !== -1){
				uid = this.memoStore.generateUid();
			}
			return uid;
		}
	},
	watch: {
		title: function () {
			this.saveMemo(this.title, this.memo);
		},
		memo: function () {
			this.saveMemo(this.title, this.memo);
		},
		'$route' (to, from){
			if (to.name === 'create') {
				this.uid = '';
				this.title = '';
				this.memo = '';
			}
		}
	}
};
</script>

<style lang="css" scoped>
.right {
	float: right;
}
</style>
