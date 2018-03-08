import { create, get, deleteReq } from '../services/app'

export default {
    namespace: 'appList',
    state: {
        list: [],
        modalVisible: false,
        appKeyModalVisible:false,
        appKey:'',
        isLoading: false,
        showSuccessWord:false
    },
    reducers: {
        loadList(state,{listArr}){
            return Object.assign({}, state, {
                list: listArr
            })
        },
        openAppKeyModal(state,{appKey,showSuccessWord}) {
            return Object.assign({}, state, {
                appKeyModalVisible: true,
                appKey,
                showSuccessWord
            })
        },
        closeAppKeyModal(state) {
            return Object.assign({}, state, {
                appKeyModalVisible: false
            })
        },
        openModal(state) {
            return Object.assign({}, state, {
                modalVisible: true
            })
        },
        closeModal(state) {
            return Object.assign({}, state, {
                modalVisible: false
            })
        },
        loading(state) {
            return Object.assign({}, state, {
                isLoading: true
            })

        },
        stopLoading(state) {
            return Object.assign({}, state, {
                isLoading: false
            })
        }
    },
    effects: { 
        * deleteApp({appKey}, { call, put }) {
            const listArr = yield call(deleteReq,appKey)
            /*  刷新列表 */
            yield put({ type: 'getAppList' })
        },
        * createApp({ payload }, { call, put }) {
            const res = yield call(create, payload)
            yield put({ type: 'closeModal' })
            yield put({ type: 'stopLoading' })
            /* 弹出modal appKey 成功 */
            yield put({ type: 'openAppKeyModal', showSuccessWord:true, appKey:res.appKey})
            /*  刷新列表 */
            yield put({ type: 'getAppList' })
        },
        * getAppList({}, { call, put }) {
            const listArr = yield call(get)
            yield put({ type: 'loadList', listArr })
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname,query }) => {
                if (pathname === '/app-list') {
                    dispatch({type:'common/checkLogin'})
                    dispatch({type: 'getAppList'})
                    dispatch({type: 'common/changePageTitle',title:'应用列表'})
                }
            })
        },
    }
}
