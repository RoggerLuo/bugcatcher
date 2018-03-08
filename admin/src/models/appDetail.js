import {get, getType, refresh } from '../services/bug'

export default {
    namespace: 'appDetail',
    state: {
        modalVisible: false,
        list: [],
        modalData: {},
        urlOptions: [],
        browserOptions: [],
        choosedUrl: '',
        choosedBrowser: '',
        fromTo:''
    },
    reducers: {
        choosedTime(state, { fromTo }) {
            return Object.assign({}, state, {
                fromTo
            })
        },
        choosedUrl(state, { url }) {
            return Object.assign({}, state, {
                choosedUrl: url
            })
        },
        choosedBrowser(state, { browser }) {
            return Object.assign({}, state, {
                choosedBrowser: browser
            })
        },

        openModal(state, { record }) {
            return Object.assign({}, state, {
                modalVisible: true,
                modalData: record
            })
        },
        closeModal(state) {
            return Object.assign({}, state, {
                modalVisible: false
            })
        },
        loadList(state, { listArr }) {
            return Object.assign({}, state, {
                list: listArr
            })
        },
        loadDropdownOptions(state, { obj }) {
            const browserOptions = []
            for (let key in obj.types) {
                // console.log(key)
                let tempEl = {
                    name: key,
                    versions: obj.types[key]
                }
                browserOptions.push(tempEl)
            }
            return Object.assign({}, state, {
                urlOptions: obj.urls,
                browserOptions
            })
        }
    },
    effects: { 
        * refreshBugList({ appKey, hash }, { call, put }) {
            const listArr = yield call(refresh, appKey, hash)
            yield put({ type: 'loadList', listArr })
        },
        * getBugList({ appKey }, { call, put }) {
            const listArr = yield call(get, appKey)
            yield put({ type: 'loadList', listArr })
        },
        * getDropdownOptions({ appKey }, { call, put }) {
            const obj = yield call(getType, appKey)
            yield put({ type: 'loadDropdownOptions', obj })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname, query }) => {
                if (pathname === '/app-detail') {
                    console.log(query.id)
                    dispatch({type:'common/checkLogin'})
                    dispatch({ type: 'getBugList', appKey: query.id })
                    dispatch({ type: 'getDropdownOptions', appKey: query.id })
                }
            })
        },
    },
};
