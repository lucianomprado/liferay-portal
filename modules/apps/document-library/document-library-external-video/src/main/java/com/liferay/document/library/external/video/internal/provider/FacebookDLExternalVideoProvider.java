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

package com.liferay.document.library.external.video.internal.provider;

import com.liferay.document.library.external.video.DLExternalVideo;
import com.liferay.document.library.external.video.provider.DLExternalVideoProvider;
import com.liferay.frontend.editor.embed.EditorEmbedProvider;
import com.liferay.frontend.editor.embed.constants.EditorEmbedProviderTypeConstants;
import com.liferay.petra.string.StringBundler;
import com.liferay.portal.kernel.util.StringUtil;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

import org.osgi.service.component.annotations.Component;

/**
 * @author Alejandro Tardín
 */
@Component(
	property = "type=" + EditorEmbedProviderTypeConstants.VIDEO,
	service = {DLExternalVideoProvider.class, EditorEmbedProvider.class}
)
public class FacebookDLExternalVideoProvider
	implements DLExternalVideoProvider, EditorEmbedProvider {

	@Override
	public DLExternalVideo getDLExternalVideo(String url) {
		if (!_matches(url)) {
			return null;
		}

		return new DLExternalVideo() {

			@Override
			public String getDescription() {
				return null;
			}

			@Override
			public String getEmbeddableHTML() {
				return StringUtil.replace(getTpl(), "{embedId}", url);
			}

			@Override
			public String getThumbnailURL() {
				return null;
			}

			@Override
			public String getTitle() {
				return null;
			}

			@Override
			public String getURL() {
				return url;
			}

		};
	}

	@Override
	public String getId() {
		return "facebook";
	}

	@Override
	public String getTpl() {
		return StringBundler.concat(
			"<iframe allowFullScreen=\"true\" allowTransparency=\"true\" ",
			"frameborder=\"0\" height=\"315\" ",
			"src=\"https://www.facebook.com/plugins/video.php?",
			"height=315&href={embedId}&show_text=0&width=560\" ",
			"scrolling=\"no\" style=\"border: none; overflow: hidden;\" ",
			"width=\"560\"></iframe>");
	}

	@Override
	public String[] getURLSchemes() {
		Stream<Pattern> stream = _urlPatterns.stream();

		return stream.map(
			Pattern::pattern
		).toArray(
			String[]::new
		);
	}

	private boolean _matches(String url) {
		for (Pattern urlPattern : _urlPatterns) {
			Matcher matcher = urlPattern.matcher(url);

			if (matcher.matches()) {
				return true;
			}
		}

		return false;
	}

	private static final List<Pattern> _urlPatterns = Arrays.asList(
		Pattern.compile(
			"(https?:\\/\\/(?:www\\.)?facebook\\.com\\/watch\\/?\\?v=\\S*)"),
		Pattern.compile(
			"(https?:\\/\\/(?:www\\.)?facebook\\.com\\/\\S*\\/videos\\/\\S*)"));

}