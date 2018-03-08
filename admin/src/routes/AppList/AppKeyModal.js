import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal, message, Button } from 'antd';
import s from './AppList.css'
import successPNG from "../../assets/add_app_success.png"
import copy from 'copy-to-clipboard'
import { protocol_and_host } from '../../config'

const AppKeyModal = ({visible,dispatch,appKey,showSuccessWord}) => {
    const cancel = () => {
        dispatch({type:'appList/closeAppKeyModal'})
    }
    let success = ''
    let title = 'AppKey'
    const oneKeyCopy = (content) => {
        copy(content)
        message.success('成功复制到剪贴板', 15)
    }
    if(showSuccessWord){
        title = '应用创建成功'
        success = (<div className={s.appKeyContentSuccess}><img src={successPNG} className={s.successPNG}/>应用创建成功</div>)
    }

    const script = `<script type="text/javascript" src="`+ protocol_and_host +`/catcher.js?key=`+ appKey +`"></script>`
    return (
        <Modal
          width="850px"
          title={title}
          visible={visible}
          onCancel={cancel}
          footer={null}
        >
            <div className={s.appKeyOuter}>
                {success}
                <div className={s.appKeyContent}>把{`<script>`}代码添加到html中，完成配置</div>

                <span className={s.clickToCopy} onClick={()=>{oneKeyCopy(script)}}>点击复制配置代码</span>
                <div className={s.appKeyTextContainer}>
                  <code>{script}</code>
                </div>
                <span className={s.clickToCopy} onClick={()=>{oneKeyCopy(appKey)}}>点击复制appKey</span>
                <div className={s.appKeyTextContainer}>
                    appKey: {appKey}
                </div>
                
                <div className={s.appKeyButtonContainer}>
                    <Button onClick={cancel} type='primary' size='large'>完成</Button>
                </div>
            </div>
        </Modal>
    )
}

function mapStateToProps(state) {
    return {visible:state.appList.appKeyModalVisible,appKey:state.appList.appKey,showSuccessWord:state.appList.showSuccessWord};
}

export default connect(mapStateToProps)(AppKeyModal);
