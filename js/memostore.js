const STRAGE_KEY = "vue-memo";
const UID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const memoStorage = {
	fetch: function (){
		let memos = JSON.parse(localStorage.getItem(STRAGE_KEY) || '[]');
		return memos;
	},
	save: function (memos){
		localStorage.setItem(STRAGE_KEY, JSON.stringify(memos));
	}
};
export const memoStore = {
	memos: memoStorage.fetch(),
	uidchars: UID_CHARS,
	saveMemo (){
		memoStorage.save(this.memos);
	},
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
	deleteMemo (uid){
		const index = this.searchWithUid(uid);
		if (index === -1){
			return;
		}
		this.memos.splice(index, 1);
		return;
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
	generateUid (){
		let uid = "xxxxxxxx"; // uid length is 8.
		return uid.replace(/x/g, () =>{
			let i = Math.random() * this.uidchars.length | 0;
			return this.uidchars[i];
		});
	}
};

