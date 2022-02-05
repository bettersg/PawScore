import { Animal } from "@contract";
import { PetApi } from "api/petApi";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { FormError } from "../styledComponents";
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
	const handleSubmit = async (
		values: Animal.Attributes,
		{ setSubmitting, setStatus }: FormikHelpers<Animal.Attributes>,
	) => {
		setSubmitting(true);
		setStatus({ apiError: false });

		try {
			await new PetApi().updatePetData(petData.id, values);
			toggleEditModeOff();
		} catch (err) {
			setSubmitting(false);
			setStatus({ apiError: true });
		}
	};

	return (
		<Formik
			validationSchema={schema}
			initialValues={petData}
			onSubmit={handleSubmit}
			validateOnMount={true}
		>
			{(formikProps) => {
				const pet = formikProps.values;
				const updateImages = (images: Animal.Image[]) => {
					formikProps.setFieldValue(
						"animalImages" as keyof Pick<
							Animal.Attributes,
							"animalImages"
						>,
						images,
					);
				};
				const onSelectChange = (
					value: Animal.Species | Animal.AdoptionStatus,
					field: keyof Animal.Attributes,
				) => {
					formikProps.setFieldValue(field, value);
				};
				return (
					<>
						{formikProps.status?.apiError && (
							<FormError
								type="error"
								message="Something went wrong."
								showIcon
								closable
							/>
						)}
						<FormComponents.FormHeader
							petId={pet.id}
							onClickCancel={toggleEditModeOff}
							isValidForm={formikProps.isValid}
							isSubmitting={formikProps.isSubmitting}
							handleSubmit={formikProps.submitForm}
						/>
						<FormComponents.ImageSection
							images={pet.animalImages || []}
							updateImages={updateImages}
						/>
						<FormComponents.PetInfoSection
							petData={pet}
							handleChange={formikProps.handleChange}
							handleSelectChange={onSelectChange}
						/>
						<FormComponents.ImportantInfoSection
							petData={pet}
							handleChange={formikProps.handleChange}
							handleSelectChange={onSelectChange}
						/>
					</>
				);
			}}
		</Formik>
	);
};
