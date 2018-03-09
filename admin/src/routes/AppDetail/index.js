import React from 'react';
import { connect } from 'dva';
import s from './AppDetail.css';
import c from '../../assets/common.css';
import DetailModal from './DetailModal';
import TimerPicker from './TimerPicker';
import AppLayout from '../../components/DetailLayout';
import { Cascader, Button, Table, Row, Col } from 'antd';
import '../../utils/timeFormat'

function AppDetail({dispatch,appDetail,location,title}) {
    // console.log(location.query) //参数
    const dataSource = appDetail.list.map((el,index)=>{
        
        const contentArr = el.description && el.description.split('\n')|| []
        const messageTransferred = (
            <div>
                {
                    contentArr.slice(0,1).map((el,index)=>(<div key={index} style={{paddingBottom:'5px'}}>{el}</div>))
                }
                {contentArr.length>1?(<div>...... </div>):null}
            </div>
        )//data.message && data.message.replace(/\n/g,"<br/>")||''

        return {
            key:el._id,
            time: new Date(el.createDate).Format("yyyy-MM-dd hh:mm:ss"),
            messageTransferred,
            message:el.description,
            url:el.url,
            line:el.line,
            column:el.column,
            pageRoute:el.visitPage.url,
            functionName:el.stack.functionName||' - ',

            browserName:el.userAgent.browser.name,
            browserVersion:el.userAgent.browser.version,
            engineName:el.userAgent.engine.name,
            engineVersion:el.userAgent.engine.version,

            osName:el.userAgent.os.name,
            osVersion:el.userAgent.os.version,

            visitName:el.visitPage.name
        }
    })
    const columns = [{
        title: '错误发生时间',
        dataIndex: 'time',
        key: 'time',
        width:'150px'
    }, {
        title: '网页标题',
        dataIndex: 'visitName',
        key: 'visitName',
        width:'100px'
    },{
        title: '错误信息',
        dataIndex: 'messageTransferred',
        key: 'messageTransferred',
        width:'200px'
    },  {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
    }, {
        title: '浏览器类型',
        dataIndex: 'browserName',
        key: 'browserName',
    }, {
        title: '操作系统',
        dataIndex: 'osName',
        key: 'osName',
    }];
    const browserOptions = appDetail.browserOptions.map((el,index)=>{
        const childrenArr = el.versions.map((el2)=>{
            return {value:el2,label:'major '+el2}
        })
        return {
            value:el.name,
            label:el.name,
            children:childrenArr
        }
    })
    
    const urlOptions = appDetail.urlOptions.map((el)=>{
        return {
            value:el,
            label:el
        }
    })
    
    function refreshBugList(choosedUrl,choosedBrowser,fromTo){
        choosedUrl = choosedUrl || appDetail.choosedUrl
        choosedBrowser = choosedBrowser || appDetail.choosedBrowser
        fromTo = fromTo || appDetail.fromTo
        let string = '?'

        if(choosedBrowser){
            string += `type=`+choosedBrowser+'&'
        }
        
        if(choosedUrl){
            string += `url=`+choosedUrl+'&'
        }

        if(fromTo){
            string += fromTo
        }
        string = string.slice(0,-1)
        dispatch({type:'appDetail/refreshBugList',appKey:location.query.id,hash:string})
    }
    function onChangeBrower(value) {
        let browser = value[0]+'$'+value[1]
        if(!value[0]){
            browser = ''
        } 
        dispatch({type:'appDetail/choosedBrowser',browser})
        refreshBugList(false,browser)
    }
    function onChangeUrl(value) {
        dispatch({type:'appDetail/choosedUrl',url:value[0]})
        refreshBugList(value[0],false)
    }
    function rowClick(record, index){
        console.log(index)
        console.log(record)
        dispatch({type:'appDetail/openModal',record})
    }
    function chooseTime(moment,string){
        const fromTo = 'from='+string[0]+'&to='+string[1]+'&'
        dispatch({type:'appDetail/choosedTime',fromTo})
        refreshBugList(false,false,fromTo)
    }
    return (
        <AppLayout color={"white"}>
            
            <div className={c.middleGap}></div>
            <Row>
                <Col span={5} offset={1} >
                <h2>{location.query.name}</h2>
                </Col>
            </Row>

            <div className={c.middleGap}></div>

            <Row>
                <Col span={5} offset={1} >
                    <TimerPicker chooseTime={chooseTime}/>
                </Col>
                <Col span={3} offset={1} >
                    <Cascader placeholder="选择终端类型" options={browserOptions} onChange={onChangeBrower}/>
                </Col>
                <Col span={4} offset={1} >
                    <Cascader className={s.cascaderURL} placeholder="选择URL来源" options={urlOptions} onChange={onChangeUrl} />
                </Col>
            </Row>
            
            <div className={c.middleGap}></div>
            
            <Row>
                <Col span={22} offset={1} className={s.tableBlock}>
                    <Table onRowClick={rowClick} dataSource={dataSource} columns={columns} className={s.table}/>
                </Col>
            </Row>
            <DetailModal visible={appDetail.modalVisible}/>
        </AppLayout>
    );
}

function mapStateToProps(state) {
    return {
        appDetail:state.appDetail,
        title:state.common.pageTitle,
    }
}

export default connect(mapStateToProps)(AppDetail);
