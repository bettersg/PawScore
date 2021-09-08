import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const SaveModal = (props) => {
	const { confirm } = Modal;

	const onClickCancel = () => {
		confirm({
			title: "Discard changes?",
			icon: <ExclamationCircleOutlined />,
			content: "Any unsaved changes will be discarded.",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				console.log("OK");
			},
			onCancel() {
				console.log("Cancel");
			}
		});
	};

	const onClickSave = () => {
		confirm({
			title: "Save changes?",
			icon: <ExclamationCircleOutlined style={{ color: "#1890FF" }} />,
			okText: "Yes",
			cancelText: "No",
			onOk() {
				console.log("OK");
			},
			onCancel() {
				console.log("Cancel");
			}
		});
	};

	return (
		<div>
      {props.type === "primary" ? (
        <Button onClick={onClickSave} type="primary">
					Save
				</Button>
      ) : (
          <Button onClick={onClickCancel}>Cancel</Button>
			)}
		</div>
	);
};

export default SaveModal;
