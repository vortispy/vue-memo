import Vue from 'vue'
import VueRouter from 'vue-router'
import EditPage from './EditPage.vue'
import MemoList from './MemoList.vue'

Vue.use(VueRouter);

const routes = [
	{ path: '/', name: 'home', component: MemoList },
	{ path: '/edit/:uid', name: 'update', component: EditPage },
	{ path: '/edit', name: 'create', component: EditPage }
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
