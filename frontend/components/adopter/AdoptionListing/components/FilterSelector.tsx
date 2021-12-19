import { CaretDownFilled } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import styled from "styled-components";

interface FilterSelectorProps {
    label: string;
    options: string[];
    onChange: (option: string) => void;
}

export function FilterSelector(props: FilterSelectorProps) {
    const { label, options, onChange } = props;

    return (
        <Selector
            overlay={
                <Menu>
                    <Menu.Item>Test</Menu.Item>
                </Menu>
            }
        >
            <SelectorButton size="large">
                {label} <CaretDownFilled style={{ color: "#858C94" }} />
            </SelectorButton>
        </Selector>
    );
}

const Selector = styled(Dropdown)``;

const SelectorButton = styled(Button)`
	border: 2px solid #222261;
	border-radius: 8px;
`;
