import { connect } from 'dva';
import s from './AppList.css';
import c from '../../assets/common.css';
import { message, Button, Layout, Row, Col, Icon } from 'antd';
import AppLayout from '../../components/AppLayout';

import Title from './Title';
import AppItem from './AppItem';
import CreateModal from './CreateModal';
import AppKeyModal from './AppKeyModal';
import Chart from './Chart';

function AppList({appList,dispatch}) {
    const createNew = () => {
        dispatch({type:'appList/openModal'})
    }
    return (
        <AppLayout>
            <div className={c.middleGap}></div>

            <div className={c.middleGap}></div>

            <Row>
                <Col span={3} offset={2}>
                    <div onClick={createNew} className={s.addNewAPP}><Icon type="plus" />添加新应用</div>
                </Col>
            </Row>
            <div className={c.middleGap}></div>
            <Title />
            <div className={c.smallGap}></div>
            {appList.list && appList.list.map((el,index)=>(<AppItem {...{dispatch,data:el,key:index,id:index}}/>))}
            <CreateModal />
            <AppKeyModal />
            <div className={c.largeGap}></div>
            <div className={c.largeGap}></div>

        </AppLayout>
    );
}

function mapStateToProps(state) {
    return {appList:state.appList};
}

export default connect(mapStateToProps)(AppList);

/*
<Row type='flex' justify='center'>
    <Chart />
</Row>
*/