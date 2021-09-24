import { Modal, Button, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

type Props = {
	type: "primary" | string;
};

const SaveModal = (props: Props) => {
	const { confirm } = Modal;
	const key = "updatable";

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
				onSaveConfirm();
			},
			onCancel() {
				console.log("Cancel");
			}
		});
	};

	const onSaveConfirm = () => {
		message.loading({ content: "Saving changes...", key });
		setTimeout(() => {
			message.success({
				content: "Changes saved successfully",
				key,
				duration: 2
			});
		}, 1500);
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
