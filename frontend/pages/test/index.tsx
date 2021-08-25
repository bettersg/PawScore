import styles from "./Test.module.css";
import WithNavBar from "layouts/WithNavBar";

const Test = () => {
	return (
		<WithNavBar>
			<div className={styles.hello}>this is a testing page</div>
			<div>try going to /test/[id]</div>
		</WithNavBar>
	);
};

export default Test;
