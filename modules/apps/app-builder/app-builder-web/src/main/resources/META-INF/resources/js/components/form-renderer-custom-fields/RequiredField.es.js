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

import {ClayButtonWithIcon} from '@clayui/button';
import {ClayRadio} from '@clayui/form';
import ClayPopover from '@clayui/popover';
import {ClayTooltipProvider} from '@clayui/tooltip';
import React, {useEffect, useRef, useState} from 'react';

import isClickOutside from '../../utils/clickOutside.es';

export default ({children, field, index}) => {
	const [showPopover, setShowPopover] = useState(false);
	const popoverRef = useRef(null);
	const triggerRef = useRef(null);

	useEffect(() => {
		const handler = ({target}) => {
			const outside = isClickOutside(
				target,
				popoverRef?.current,
				triggerRef?.current
			);

			if (outside) {
				setShowPopover(false);
			}
		};

		window.addEventListener('click', handler);

		return () => window.removeEventListener('click', handler);
	}, [popoverRef, triggerRef]);

	return (
		<div className="d-flex form-renderer-required-field justify-content-between">
			{children({field, index})}

			<ClayTooltipProvider>
				<ClayButtonWithIcon
					borderless
					disabled={!field.value}
					displayType="secondary"
					onClick={() => setShowPopover(!showPopover)}
					ref={triggerRef}
					small
					symbol="ellipsis-v"
					title={Liferay.Language.get('required-options')}
				/>
			</ClayTooltipProvider>

			<ClayPopover
				alignPosition="bottom-right"
				className="form-renderer-required-field__popover"
				header={Liferay.Language.get('required-options')}
				onShowChange={setShowPopover}
				ref={popoverRef}
				show={showPopover}
			>
				<div className="mt-2">
					<ClayRadio
						disabled
						label={Liferay.Language.get('only-for-this-form')}
						name="required-level"
						value="view-level"
					/>

					<ClayRadio
						checked
						label={Liferay.Language.get(
							'for-all-forms-of-this-object'
						)}
						name="required-level"
						value="object-level"
					/>
				</div>
			</ClayPopover>
		</div>
	);
};
