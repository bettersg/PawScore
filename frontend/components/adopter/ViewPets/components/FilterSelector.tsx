import { CaretDownFilled } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Row, Typography } from "antd";
import { FocusEvent, useRef, useState } from "react";
import styled from "styled-components";

export interface FilterSelectorProps<T> {
    label: string;
    values?: T[];
    selections: {
        title?: string;
        options: { label: string; value: T }[];
    }[];
    onChange: (options: T[]) => void;
}

export function FilterSelector<T extends string | number>(
    props: FilterSelectorProps<T>,
) {
    const { label, values, selections, onChange } = props;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = (e: FocusEvent<any>) => {
        if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
            setIsOpen(false);
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <SelectorButton
                size="large"
                onClick={toggleDropdown}
                onBlur={closeDropdown}
            >
                {label} <CaretDownFilled style={{ color: "#858C94" }} />
            </SelectorButton>
            {
                <SelectorDropdown
                    isOpen={isOpen}
                    tabIndex={-1}
                    ref={dropdownRef}
                    onBlur={closeDropdown}
                >
                    <CheckboxSection>
                        <Checkbox.Group
                            onChange={onChange as any}
                            value={values}
                        >
                            {selections.map((selection) => (
                                <Row
                                    key={selection.title}
                                    gutter={[16, 16]}
                                    style={{ marginBottom: 18 }}
                                >
                                    {selection.title && (
                                        <Col span={24}>
                                            <SectionHeading>
                                                {selection.title}
                                            </SectionHeading>
                                        </Col>
                                    )}
                                    {selection.options.map((option) => (
                                        <Col span={24} key={option.value}>
                                            <Checkbox value={option.value}>
                                                {option.label}
                                            </Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                            ))}
                        </Checkbox.Group>
                    </CheckboxSection>
                    <Divider style={{ margin: 0 }} />
                    <DoneButton type="primary" onClick={toggleDropdown}>
                        Done
					</DoneButton>
                </SelectorDropdown>
            }
        </div>
    );
}

const SelectorButton = styled(Button)`
	border: 2px solid #222261;
	border-radius: 8px;
`;

const SectionHeading = styled(Typography.Title)`
	&& {
		color: #5e38ba;
		font-size: 16px;
		margin: 0;
	}
`;

const SelectorDropdown = styled.div<{ isOpen: boolean }>`
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	border: 1px solid #dadee3;
	border-radius: 4px;
	position: absolute;
	background-color: #fff;
	margin-top: 10px;
	width: 253px;
	max-height: 50vh;
	overflow: auto;
	z-index: 1;
	display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const CheckboxSection = styled.div`
	padding: 8px 16px 0 16px;
`;

const DoneButton = styled(Button)`
	float: right;
	margin: 10px 16px;
	background-color: #41419f;
	border-radius: 6px;
`;
