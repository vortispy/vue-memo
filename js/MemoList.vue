<template>
	<div>
		<span v-if="memoStore.memos.length === 0">You don't have any memos.</span>
		<ul v-else>
			<li v-for="memo in memoStore.memos">
				<router-link :to="{ name: 'update', params: { uid: memo.uid }}">
					{{ memo.title }}
				</router-link>
				<span>{{ memo.created_at }}</span>
				<button v-on:click="deleteMemo(memo.uid)">delete</button>
			</li>
		</ul>
	</div>
</template>

<script>
import {memoStore} from './memostore.js'

export default {
	data: function (){
		return {
			memoStore: memoStore
		};
	},
	methods: {
		deleteMemo: function (uid){
			memoStore.deleteMemo(uid);
			memoStore.saveMemo();
		}
	}
};
</script>
