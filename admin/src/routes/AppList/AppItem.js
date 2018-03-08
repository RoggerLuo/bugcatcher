import React from 'react';
import { routerRedux } from 'dva/router';
import s from './AppList.css';
import c from '../../assets/common.css';
import AppLayout from '../../components/AppLayout';
import { Popover, Button, Layout, Row, Col } from 'antd';
import { Modal } from 'antd';

function AppItem({ dispatch, data, id }) {
    const showAppKey = () => {
        dispatch({ type: 'appList/openAppKeyModal', showSuccessWord: false, appKey:data._id})
    }
    const onDelete = () => {
        Modal.confirm({
            title: '提示',
            content: '你真的要删除应用"'+data.name+'"吗',
            onOk() {
                dispatch({type:'appList/deleteApp',appKey:data._id})
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const content = (
      <div>
        <div onClick={onDelete} className={s.menuButton}>删除应用</div>
        <div onClick={showAppKey} className={s.menuButton}>查看appKey</div>
      </div>
    );
    const stopPropagation = (e) => {
        e.stopPropagation()
    }
    const goToDetail = () => {
        dispatch(routerRedux.push({
          pathname: '/app-detail',
          query: {id:data._id,name:data.name},
        }))
        dispatch({type:'common/changePageTitle',title:data.name})
    }
    return (
        <div>
            <Row >
                <Col onClick={goToDetail} className={s.appItem} span={20} offset={2} >
                    <Row className={c.height100}>
                        <Col span={4} offset={1}>
                            {data.name}
                        </Col> 
                        <Col span={4} offset={2}>
                            {data.description}
                        </Col>
                        <Col span={2} offset={2} className={s.bugNumber}>
                            {data.bugNumberToday}
                        </Col>

                        <Col span={2} offset={7}>
                            <Popover onClick={stopPropagation} placement="bottomRight" title={null} content={content} trigger="click">                                   
                                <Button className={s.dashedButton}>▪ ▪ ▪</Button>
                            </Popover>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className={c.smallGap}></div>
        </div>
    )
}

export default AppItem
