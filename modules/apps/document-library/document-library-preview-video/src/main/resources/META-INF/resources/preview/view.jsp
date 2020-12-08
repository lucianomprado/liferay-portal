<%--
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
--%>

<%@ include file="/preview/init.jsp" %>

<liferay-util:html-top
	outputKey="document_library_external_video_css"
>
	<link href="<%= PortalUtil.getStaticResourceURL(request, PortalUtil.getPathModule() + "/document-library-external-video/css/main.css") %>" rel="stylesheet" />
</liferay-util:html-top>

<div class="external-video-preview external-video-preview-framed preview-file">
	<div class="external-video-preview-aspect-ratio">

		<%
		DLExternalVideo dlExternalVideo = (DLExternalVideo)request.getAttribute(DLExternalVideo.class.getName());
		%>

		<%= dlExternalVideo.getEmbeddableHTML() %>
	</div>
</div>