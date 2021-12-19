import { CaretDownFilled } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Row, Typography } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useRef, useState } from "react";
import styled from "styled-components";

interface FilterSelectorProps<T> {
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

    return (
        <div style={{ position: "relative" }}>
            <SelectorButton
                size="large"
                onClick={() => {
                    setIsOpen(true);
                    dropdownRef.current?.focus();
                }}
            >
                {label} <CaretDownFilled style={{ color: "#858C94" }} />
            </SelectorButton>
            {
                <SelectorDropdown
                    isOpen={isOpen}
                    tabIndex={-1}
                    ref={dropdownRef}
                    onBlur={(e) => {
                        if (
                            !dropdownRef.current?.contains(
                                e.relatedTarget as Node,
                            )
                        ) {
                            setIsOpen(false);
                        } else {
                            e.preventDefault();
                        }
                    }}
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
                    <Button
                        type="primary"
                        onClick={(e) => setIsOpen(false)}
                        style={{ float: "right", margin: "10px 16px" }}
                    >
                        Done
					</Button>
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
	z-index: 1;
	width: 253px;
	opacity: ${(props) => (props.isOpen ? "1" : "0")};
`;

const CheckboxSection = styled.div`
	padding: 8px 16px 0 16px;
`;
