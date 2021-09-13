import { Tag } from "antd";

const SwitchTag = (props) => {
	const { type, value } = props;

	let element: JSX.Element;

// Switch cases are case-sensitive
// Ensure that all props are taken in lowercase only

	switch(type) {
    case "visibility":
      switch (value) {
        case "yes":
          return element = <Tag color="green">yes</Tag>;
        case "no":
          return element = <Tag color="red">no</Tag>;
        default:
          return element = <Tag>{value}</Tag>;
      };
		case "species":
			switch(value) {
				case "dog":
					return element = <Tag color="gold">dog</Tag>;
				case "cat":
					return element = <Tag color="red">cat</Tag>;
				case "rabbit":
					return element = <Tag color="blue">rabbit</Tag>;
				default:
					return element = <Tag>{value}</Tag>;
			}
		case "status":
			switch(value) {
				case "healthy":
					return element = <Tag color="gold">healthy</Tag>;
				case "sick":
					return element = <Tag color="red">sick</Tag>;
				case "fostered":
					return element = <Tag color="blue">fostered</Tag>;
				case "adopted":
					return element = <Tag color="purple">adopted</Tag>;
				default:
					return element = <Tag>{value}</Tag>;
			}
		default:
			return element = <Tag>{value}</Tag>;
	}

	return element;
};

export default SwitchTag;
