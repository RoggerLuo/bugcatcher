import React from 'react';
import { connect } from 'dva';
import s from './IndexPage.css';
import Form from './LoginForm';
import { message } from 'antd';
import RegisterModal from './RegisterModal';


function IndexPage({dispatch}) {

  const handleSubmit = (event,form) => {
      event.preventDefault()
      console.log(form.getFieldsValue())
      dispatch({
          type: 'common/login',
          payload: Object.assign({}, form.getFieldsValue(), { message })
      })
      // dispatch({type:'appList/loading'})

  }
  const register = () => {
      dispatch({type:'common/change',key:'registerVisitible',value:true})
  }

  return (
    <div className={s.normal}>
      <div className={s.response20Gap}></div>
      <h1 className={s.title}>Welcome to Bug Catcher!</h1>
      <div className={s.formContainer}>
          <Form handleSubmit={handleSubmit}/>
      </div>
      <ul className={s.list}>
        <li>&nbsp;&nbsp;&nbsp;还没有账号？</li>
        <li><a onClick={register}>点击这里注册</a></li>
      </ul>
      <RegisterModal />
    </div>
  );
}

export default connect()(IndexPage);
