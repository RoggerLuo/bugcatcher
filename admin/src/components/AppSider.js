import { Menu, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Sider = ({dispatch}) => {
    const routeHandler = {
        key1(){
            dispatch(routerRedux.push('/app-list'))
        },
    }
    const handleClick = (e) => {
        console.log('click ', e);
        const handler = routeHandler['key'+e.key]
        return handler && handler()
    }
    return (
        <Menu
            onClick={handleClick}
            defaultSelectedKeys={['5']}
            defaultOpenKeys={['sub2','sub4']}
            mode="inline"
        >
            <Menu.Item key="1" style={{fontWeight:600}}><Icon type="left" />回到应用列表</Menu.Item>
            
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>错误信息</span></span>}>
              <Menu.Item key="5">错误信息列表</Menu.Item>
              <Menu.Item key="6">错误信息统计</Menu.Item>
            </SubMenu>

            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>访问统计</span></span>}>
              <Menu.Item key="9">访问次数</Menu.Item>
              <Menu.Item key="10">访问终端类型</Menu.Item>
            </SubMenu>
        </Menu>

    )
}
// <Menu.Item key="11">访问地域</Menu.Item>

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Sider);
