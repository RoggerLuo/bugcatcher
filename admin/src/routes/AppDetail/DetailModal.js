import { Modal, Button, Table } from 'antd';
import { connect } from 'dva';


const DetailModal = ({ visible, dispatch, data }) => {
    const cancel = () => {
        console.log('come in')
        dispatch({ type: 'appDetail/closeModal' })
    }
    const columnsBasicInfo = [
      {
          title: '页面名称',
          dataIndex: 'visitName',
          key: 'visitName',
          width: '20%',
        },{
          title: '创建时间',
          dataIndex: 'time',
          key: 'time',
          width: '20%',
        },

        {
          title: 'URL',
          dataIndex: 'url',
          key: 'url',
          width: '60%',
      }
    ];
    const columnsErrorInfo = [
      {
          title: '错误描述',
          dataIndex: 'messageTransferred',
          key: 'messageTransferred',
          width: '81%',
        },{
          title: '行',
          dataIndex: 'line',
          key: 'line',
          width: '9.5%',
        },{
          title: '列',
          dataIndex: 'column',
          key: 'column',
          width: '9.5%',
        }
    ];
    const columnsErrorInfo2 = [
      {
          title: '页面路由',
          dataIndex: 'pageRoute',
          key: 'pageRoute',
          width: '62%'
        },{
          title: '错误函数',
          dataIndex: 'functionName',
          key: 'functionName',
          width: '38%'
        }
    ];
    const columnsUserAgent = [
      {
          title: '浏览器',
          children: [{
              title: '类型',
              dataIndex: 'browserName',
              key: 'browserName',
              width: 100,
            },{
              title: '版本',
              dataIndex: 'browserVersion',
              key: 'browserVersion',
              width: 100,
          }],

      }, {
          title: '引擎',
          children: [{
              title: '类型',
              dataIndex: 'engineName',
              key: 'engineName',
              width: 100,
            },{
              title: '版本',
              dataIndex: 'engineVersion',
              key: 'engineVersion',
              width: 100,
          }],
        },{
          title: '操作系统',
          children: [{
              title: '类型',
              dataIndex: 'osName',
              key: 'os.name',
              width: 100,
            },{
              title: '版本',
              dataIndex: 'osVersion',
              key: 'os.version',
              width: 100,
          }],
        }
    ];
    const contentArr = data.message && data.message.split('\n')|| []

    data.messageTransferred = (<div>{contentArr.map((el,index)=>(<div key={index}>{el}</div>))}</div>)//data.message && data.message.replace(/\n/g,"<br/>")||''
    data = [data]
    return (
        <Modal
          width="1000px"
          title="详细信息"
          visible={visible}
          onCancel={cancel}
          footer={null}
        >
          <Table
              columns={columnsBasicInfo}
              dataSource={data}
              bordered
              size="middle"
              pagination={false}
          />
          <Table
              columns={columnsErrorInfo}
              dataSource={data}
              bordered
              size="middle"
              pagination={false}
          />
          <Table
              columns={columnsErrorInfo2}
              dataSource={data}
              bordered
              size="middle"
              pagination={false}
          />
          <Table
              columns={columnsUserAgent}
              dataSource={data}
              bordered
              size="middle"
              pagination={false}
          />
        </Modal>
    );
}

function mapStateToProps(state) {
    return {data:state.appDetail.modalData};
}

export default connect(mapStateToProps)(DetailModal);
