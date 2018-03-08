import React from 'react';
import s from './AppList.css';
import c from '../../assets/common.css';

import {Row,Col} from 'antd';

function Title({dispatch}) {  
  return (
            <Row>
                <Col span={20} offset={2} className={s.appTitleRow}>
                    <Row className={c.height100}>
                        <Col span={4} offset={1}>
                            应用名称
                        </Col> 
                        <Col span={4} offset={2}>
                            应用描述
                        </Col>
                        <Col span={2} offset={2} className={s.alignCenter}>
                            今日bug总数
                        </Col>


                        <Col span={2} offset={7}>
                            更多操作
                        </Col>
                    </Row>

                </Col>
            </Row>

  );
}
export default Title
