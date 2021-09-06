import { Menu } from "antd";
import Link from 'next/link'
import styled from "styled-components";

const LeftMenu = styled(Menu)`
    width: var(--menu-left-menu-width);
    height: calc(100vh - var(--menu-header-menu-height));

    && .ant-menu-item-selected, .ant-menu-light .ant-menu-item:hover {
        color: var(--color-golden-purple);
        background-color: var(--color-light-purple);
    }

    && .ant-menu-item-selected:after {
        border-right: 3px solid var(--color-golden-purple);
    }

    && .ant-menu-item-active, .ant-menu-item:active {
        color: var(--color-golden-purple);
    }

    && .ant-menu-item:active {
        background: var(--color-light-purple);
    }

    && .ant-menu-item a:hover, .ant-menu-item a:active {
        color: var(--color-golden-purple);
    }
`;

const MenuItems = [
    {
        'key': 'pets',
        'label': 'Pets',
    },
    {
        'key': 'application-management',
        'label': 'Application Management',
    },
    {
        'key': 'dashboard',
        'label': 'Dashboard',
    },
]

const ShelterLeftMenu = () => (
    <LeftMenu mode="inline">
        {MenuItems.map(item => (
            <Menu.Item key={item.key}>
                <Link href={`/shelter/home/${item.key}`}>
                    {item.label}
                </Link>
            </Menu.Item>
        ))}
    </LeftMenu>
);

export default ShelterLeftMenu;
// class="ant-menu-item ant-menu-item-selected ant-menu-item-only-child"