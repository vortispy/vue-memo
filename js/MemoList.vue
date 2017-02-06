<template>
	<div class="">
		<span v-if="memoStore.memos.length === 0" class="col-xs-12">You don't have any memos.</span>
		<ul v-else class="list-group">
			<li v-for="memo in memoStore.memos" class="col-xs-12 list-group-item">
				<router-link :to="{ name: 'update', params: { uid: memo.uid }}" class="col-xs-8 text-left">
					{{ memo.title }}
				</router-link>
				<span class="col-xs-2">{{ memo.created_at }}</span>
				<button v-on:click="deleteMemo(memo.uid)" class="col-xs-offset-1">X</button>
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
