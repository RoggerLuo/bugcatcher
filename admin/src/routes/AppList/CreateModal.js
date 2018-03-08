import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal, message } from 'antd';
import Form from './Form'

const DetailModal = ({visible,dispatch}) => {
    const handleSubmit = (form) => {
        console.log(form.getFieldsValue())
        dispatch({
            type: 'appList/createApp',
            payload: Object.assign({}, form.getFieldsValue(), {message})
        })
        dispatch({type:'appList/loading'})
    }
    const cancel = () => {
        dispatch({type:'appList/closeModal'})
    }
    return (
        <Modal
          width="500px"
          title="详细信息"
          visible={visible}
          onCancel={cancel}
          footer={null}
        >
          <Form handleSubmit={handleSubmit} cancel={cancel}/>   
        </Modal>
    );
}
function mapStateToProps(state) {
    return {visible:state.appList.modalVisible};
}

export default connect(mapStateToProps)(DetailModal);
