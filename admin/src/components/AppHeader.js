import { connect } from 'dva';
import s from './AppHeader.css';
import c from '../assets/common.css';
import { Tooltip, Button,Layout,Row,Col} from 'antd';
import exit from "../assets/images/exit.png"

function AppHeader({title,userMobile,dispatch}) {
    
    const logout = () => {
        console.log('logout click')
        dispatch({type:'common/logout'})
    }

  return (
    <div className={c.height100}>
         <Row className={c.height100}>
             <Col span={3}  offset={1} className={c.height100} >
                 <h2 className={s.title}>Bug Catcher</h2>
             </Col>
             <Col span={4}  offset={0} className={c.height100} >
             </Col>
             <Col span={2} offset={14} className={c.height100}>
                    <span className={s.userName}>{userMobile}</span>
                  <Tooltip placement="bottom" title='注销登录'  >
                      <div onClick={logout} style={{display:'inline-block'}}>
                        <img  src={exit} className={s.exit}/>
                      </div>
                 </Tooltip>                     
             </Col>
         </Row>
    </div>
  );
}

function mapStateToProps(state) {
    return {
        title:state.common.pageTitle,
        userMobile:state.common.userMobile
    }
}

export default connect(mapStateToProps)(AppHeader);
// 
//                  <h2 className={s.userName}>{title}</h2>
