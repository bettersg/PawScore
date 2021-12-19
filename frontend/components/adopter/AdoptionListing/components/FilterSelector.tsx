import { CaretDownFilled } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Row, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";

interface FilterSelectorProps<T> {
    label: string;
    selections: {
        title?: string;
        options: { label: string; value: T }[];
    }[];
    onChange: (options: T[]) => void;
}

export function FilterSelector<T>(props: FilterSelectorProps<T>) {
    const { label, selections, onChange } = props;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ position: "relative" }}>
            <SelectorButton size="large" onClick={(e) => setIsOpen(true)}>
                {label} <CaretDownFilled style={{ color: "#858C94" }} />
            </SelectorButton>
            {isOpen && (
                <SelectorDropdown>
                    <CheckboxSection>
                        <Checkbox.Group onChange={onChange}>
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
                    <Button
                        type="primary"
                        onClick={(e) => setIsOpen(false)}
                        style={{ float: "right", margin: "10px 16px" }}
                    >
                        Done
					</Button>
                </SelectorDropdown>
            )}
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

const SelectorDropdown = styled.div`
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	border: 1px solid #dadee3;
	border-radius: 4px;
	position: absolute;
	background-color: #fff;
	margin-top: 10px;
	z-index: 1;
	width: 253px;
`;

const CheckboxSection = styled.div`
	padding: 8px 16px 0 16px;
`;
