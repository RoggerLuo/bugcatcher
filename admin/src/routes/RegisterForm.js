import { connect } from 'dva';
import { Form, Icon, Input, Row, Col, Button } from 'antd'

const FormItem = Form.Item;
const FormComp = ({handleSubmit,form,isLoading,cancel})=>{
    const { getFieldDecorator } = form
    const click = () => {
        handleSubmit(form)
    }
    const handleConfirmBlur = (e) => {
        confirmDirty = confirmDirty || !!e.target.value
      }
    let confirmDirty = false
    const checkPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
                callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      }
    return(
        <Form onSubmit={handleSubmit}>
            <FormItem>
              {getFieldDecorator('mobile', {
                rules: [{ required: true, message: '请输入手机号' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入手机号" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
              )}
            </FormItem>
            <FormItem>
            {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: checkPassword,
                }],
              })(
                <Input placeholder="请再次输入密码" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" onBlur={handleConfirmBlur} />
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
/*
<FormItem>

  {getFieldDecorator('username', {
    rules: [{ required: true, message: '请输入用户名' }],
  })(
    <Input  placeholder="请输入用户名，将显示为昵称" />
  )}
</FormItem>*/
