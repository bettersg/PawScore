import styles from "./Test.module.css";
import ShelterLayout from "layouts/shelter/ShelterLayout";

const Test = () => {
	return (
		<ShelterLayout>
			<div className={styles.hello}>this is a testing page</div>
			<div>try going to /test/[id]</div>
		</ShelterLayout>
	);
};

export default Test;
