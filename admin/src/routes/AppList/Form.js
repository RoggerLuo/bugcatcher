import { connect } from 'dva';
import { Form, Icon, Input, Row, Col, Button } from 'antd'

const FormItem = Form.Item;
const FormComp = ({handleSubmit,form,isLoading,cancel})=>{
    const { getFieldDecorator } = form
    const click = () => {
        handleSubmit(form)
    }
    return(
        <Form onSubmit={handleSubmit}>
            <FormItem label="应用名称">
                {getFieldDecorator('appName', {
                   rules: [{ required: true, message: '请输入应用名称!', whitespace: true }],
                })(
                   <Input />
                )}
            </FormItem>
            <FormItem label="应用描述">
                {getFieldDecorator('appDes')(
                    <Input 
                        type="textarea" 
                        placeholder="可以不填" 
                        autosize={{ minRows: 2, maxRows: 6 }} 
                    />
                )}
             </FormItem>    
             <FormItem>
                <Row>
                    <Col span={4} offset={16}>
                        <Button size="large" onClick={cancel}>取消</Button>             
                    </Col>
                    <Col span={4}>
                        <Button onClick={click} loading={isLoading} type="primary" size="large">创建</Button>             
                    </Col>
                </Row>
             </FormItem>    
         </Form>
    )
}
const FormCompCreated = Form.create()(FormComp)
function mapStateToProps(state) {
    return {isLoading:state.appList.isLoading};
}
export default connect(mapStateToProps)(FormCompCreated);

