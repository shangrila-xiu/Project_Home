import Home from './components/Home.vue'
import Nav from './components/NavBar/Nav.vue'
import StuChuang from './components/News/StuChuang.vue'
import StuWork from './components/News/StuWork.vue'
import ArticleNewsDetail from './components/News/ArticleNewsDetail.vue'
import Comment from './components/Comments/Comment.vue'
import userDetail from './components/User/UserDetail.vue'
import Displayzixun from './components/ziyuan/display_ziyuan.vue'
// import ZiyuanDetail from './components/ziyuan/ZiyuanDetail.vue'

export default[
    // {
    //     assetsPublicPath: '/'
    // },
	{
        name:'not',
		path:'*',
		redirect:'/home'

	},
	{
		path: '/',
		redirect:'/home'
	},
    {
        path: '/nav/:id', 
        component: Home 
    },
    { 
    	path: '/home', 
    	component: Home 
    },

    {
        path:'/article/:id',
        component:ArticleNewsDetail
    },
    // {
    //     name:'Infos',
    //     path:''
    // },
    {
    	path: '/StuChuang',
    	component:StuChuang,
    },
    {
        path:'/stuchuang/:id',
        component:ArticleNewsDetail
    },
    {
        path:'/stuWork',
        component:StuWork
    },
    {
        path:'/stuwork/:id',
        component:ArticleNewsDetail
    },
    {
        name:'userDetail',
        path:'/userDetail',
        component:userDetail
    },
    {
        name:'displayzixun',
        path:'/displayzixun',
        component:Displayzixun
    },
    // {
    //     name:'ziyuanDetail',
    //     path:'/ziyuanDetail',
    //     component:ZiyuanDetail
    // }
    // {
    //     path:'/comment/:id',
    //     component:Comment
    // }

   ]

