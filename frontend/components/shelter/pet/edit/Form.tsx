import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Animal, Shelter } from "@contract";
import { Alert, Button } from "antd";
import Title from "antd/lib/typography/Title";
import { PetApi } from "api/petApi";
import { NewAnimal } from "common/types";
import dayjs from "dayjs";
import { Formik, FormikHelpers } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { FormComponents } from "./FormComponents";
import { schema } from "./schema";

type EditPetFormProps = {
	petData: Animal.Attributes;
	toggleEditModeOff: () => void;
};

export const EditPetForm = ({
	petData,
	toggleEditModeOff,
}: EditPetFormProps) => {
	const router = useRouter();

	const handleSubmit = () => {};

	const handleImageUpdate = () => {};

	return (
		<Formik
			validationSchema={schema}
			initialValues={petData}
			onSubmit={handleSubmit}
		>
			{(formikProps) => {
				return (
					<>
						<FormComponents.FormHeader
							petId={petData.id}
							onClickCancel={toggleEditModeOff}
						/>
						<FormComponents.ImageSection
							images={petData.animalImages || []}
							updateImages={handleImageUpdate}
						/>
						<FormComponents.PetInfoSection petData={petData} />
					</>
				);
			}}
		</Formik>
	);
};
