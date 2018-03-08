import { login, logout,info,register } from '../services/account'
import { routerRedux } from 'dva/router'
import { message } from 'antd'

function delay(timeout){ 
    return new Promise(resolve => setTimeout(resolve, timeout) )
}
export default {
    namespace: 'common',
    state: {
        pageTitle: '',
        userMobile:'',
        userName:'',
        login:false,
        registerVisitible:false
    },
    reducers: {
        change(state,{key,value}){
            let obj = {}
            obj[key] = value
            return Object.assign({}, state, obj)            
        },
        changePageTitle(state, { title }) {

            return Object.assign({}, state, {
                pageTitle: title
            })
        }
    },
    effects: { 
        * register({ payload }, { call, put }) {
            const data = yield call(register, payload)
            if(data.status =='ok'){
                yield put({type:'change',key:'registerVisitible',value:false})
                message.success('创建成功')
                yield put(routerRedux.push('/app-list'))
            }else{
                message.error('创建失败')
            }
        },

        * login({ payload }, { call, put }) {
            const data = yield call(login, payload)
            if (data.status == 'ok') {
                yield put({type:'change',key:'userMobile',value:data.results.mobile})
                yield put({type:'change',key:'login',value:true})
                yield put(routerRedux.push('/app-list'))
            }
        },
        * logout({ }, { call, put }) {
            const data = yield call(logout)
            if (data.status == 'ok') {
                yield put({type:'change',key:'userName',value:''})
                yield put({type:'change',key:'login',value:false})
                yield put(routerRedux.push('/'))
            }
        },
        * checkLogin({ pathname }, { call, put, select }) {
            const {status,results} = yield call(info)
            if(status =='ok'){
                // yield put({type:'change',key:'userName',value:results.username})
                yield put({type:'change',key:'login',value:true})
            }else{
                if(pathname != '/'){
                    message.loading('检测到您尚未登录，即将跳转登录页面. . .')
                    yield call(delay, 2000)
                    yield put(routerRedux.push('/'))                                            
                }
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname,query }) => {
                if (pathname === '/') {
                    dispatch({type:'checkLogin',pathname})
                }
            })
        },
    },
};
