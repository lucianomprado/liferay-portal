/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import React, {ChangeEventHandler, ReactNode} from 'react';
import {FormError} from '../hooks/useForm';
export default function ObjectFieldFormBase({
	allowMaxLength,
	children,
	disabled,
	errors,
	handleChange,
	objectField: values,
	objectFieldTypes,
	setValues,
	showDocumentsAndMediaOption,
}: IProps): JSX.Element;
export declare function useObjectFieldForm({
	initialValues,
	onSubmit,
}: IUseObjectFieldForm): {
	errors: FormError<
		ObjectField & {
			acceptedFileExtensions: any;
			fileSource: any;
			maximumFileSize: any;
			maxLength: any;
			showCounter: any;
		}
	>;
	handleChange: React.ChangeEventHandler<HTMLInputElement>;
	handleSubmit: React.FormEventHandler<HTMLFormElement>;
	setValues: (values: Partial<ObjectField>) => void;
	values: Partial<ObjectField>;
};
interface IUseObjectFieldForm {
	initialValues: Partial<ObjectField>;
	onSubmit: (field: ObjectField) => void;
}
interface IProps {
	allowMaxLength?: boolean;
	children?: ReactNode;
	disabled?: boolean;
	errors: ObjectFieldErrors;
	handleChange: ChangeEventHandler<HTMLInputElement>;
	objectField: Partial<ObjectField>;
	objectFieldTypes: ObjectFieldType[];
	setValues: (values: Partial<ObjectField>) => void;
	showDocumentsAndMediaOption: boolean;
}
export declare type ObjectFieldErrors = FormError<
	ObjectField &
		{
			[key in ObjectFieldSettingName]: any;
		}
>;
export {};
