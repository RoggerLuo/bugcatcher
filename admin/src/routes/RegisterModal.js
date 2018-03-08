import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal, message } from 'antd';
import Form from './RegisterForm'

const DetailModal = ({visible,dispatch}) => {
    const handleSubmit = (form) => {
        console.log(form.getFieldsValue())
        // mobile: "123", password: "123", confirm: "123", userName: "222222"}
        dispatch({
            type: 'common/register',
            payload: form.getFieldsValue()
        })
        // dispatch({type:'common/loading'})
    }
    const cancel = () => {
        dispatch({type:'common/change',key:'registerVisitible',value:false})
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
    return {visible:state.common.registerVisitible};
}

export default connect(mapStateToProps)(DetailModal);
