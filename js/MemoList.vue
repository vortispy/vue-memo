<template>
	<div class="">
		<span v-if="memoStore.memos.length === 0" class="col-xs-12">You don't have any memos.</span>
		<ul v-else class="list-group">
			<li v-for="memo in memoStore.memos" class="col-xs-12 list-group-item">
				<router-link :to="{ name: 'update', params: { uid: memo.uid }}" class="col-xs-8 text-left">
					{{ memo.title }}
				</router-link>
				<span class="col-xs-2">{{ dateString(memo.created_at) }}</span>
				<span class="col-xs-offset-1">
					<button v-on:click="deleteMemo(memo.uid)" class="btn btn-default btn-xs">X</button>
				</span>
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
		},
		dateString: function (created_at){
			const now = new Date();
			const memoDate = new Date(created_at);
			const minutes = memoDate.getMinutes();
			const hours = memoDate.getHours();
			const date = memoDate.getDate();
			const month = memoDate.getMonth() + 1;
			let datestring = "" + month + "月" + date + "日";

			if(now.getYear() !== memoDate.getYear()){
				datestring = memoDate.getFullYear() + datestring;
			}
			else if(now.getDate() === date){
				const minstring = (minutes > 9 ? "" : "0") + minutes;
				const hourstirng = (hours > 9 ? "" : "0") + hours;
				datestring += " " + hourstirng + ":" + minstring;
			}

			return datestring;
		}
	}
};
</script>
