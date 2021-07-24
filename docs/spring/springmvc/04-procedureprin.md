---
title: SpringMVC-执行流程和原理
---

::: tip
本文主要是介绍 SpringMVC-执行流程和原理 。
:::

[[toc]]

## SpringMVC执行流程及工作原理


**图解SpringMVC执行流程:**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springmvc/procedureprin-1.png')" alt="wxmp">


## SpringMVC执行流程


**SpringMVC执行流程:**
* 1.用户发送请求至前端控制器DispatcherServlet
* 2.DispatcherServlet收到请求调用处理器映射器HandlerMapping。
* 3.处理器映射器根据请求url找到具体的处理器，生成处理器执行链HandlerExecutionChain(包括处理器对象和处理器拦截器)一并返回给DispatcherServlet。
* 4.DispatcherServlet根据处理器Handler获取处理器适配器HandlerAdapter执行HandlerAdapter处理一系列的操作，如：参数封装，数据格式转换，数据验证等操作
* 5.执行处理器Handler(Controller，也叫页面控制器)。
* 6.Handler执行完成返回ModelAndView
* 7.HandlerAdapter将Handler执行结果ModelAndView返回到DispatcherServlet
* 8.DispatcherServlet将ModelAndView传给ViewReslover视图解析器
* 9.ViewReslover解析后返回具体View
* 10.DispatcherServlet对View进行渲染视图（即将模型数据model填充至视图中）。
* 11.DispatcherServlet响应用户。



**当然也有以下几种表示但是都是与第一种说法一样.**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springmvc/procedureprin-2.png')" alt="wxmp">


执行流程



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springmvc/procedureprin-3.png')" alt="wxmp">


**我们针对第一张图进行分析**

#### 组件说明：

* 1.DispatcherServlet：前端控制器。用户请求到达前端控制器，它就相当于mvc模式中的c，dispatcherServlet是整个流程控制的中心，由它调用其它组件处理用户的请求，dispatcherServlet的存在降低了组件之间的耦合性,系统扩展性提高。由框架实现
* 2.HandlerMapping：处理器映射器。HandlerMapping负责根据用户请求的url找到Handler即处理器，springmvc提供了不同的映射器实现不同的映射方式，根据一定的规则去查找,例如：xml配置方式，实现接口方式，注解方式等。由框架实现
* 3.Handler：处理器。Handler 是继DispatcherServlet前端控制器的后端控制器，在DispatcherServlet的控制下Handler对具体的用户请求进行处理。由于Handler涉及到具体的用户业务请求，所以一般情况需要程序员根据业务需求开发Handler。
* 4.HandlAdapter：处理器适配器。通过HandlerAdapter对处理器进行执行，这是适配器模式的应用，通过扩展适配器可以对更多类型的处理器进行执行。由框架实现。
* 5.ModelAndView是springmvc的封装对象，将model和view封装在一起。
* 6.ViewResolver：视图解析器。ViewResolver负责将处理结果生成View视图，ViewResolver首先根据逻辑视图名解析成物理视图名即具体的页面地址，再生成View视图对象，最后对View进行渲染将处理结果通过页面展示给用户。
* 7View:是springmvc的封装对象，是一个接口, springmvc框架提供了很多的View视图类型，包括：jspview，pdfview,jstlView、freemarkerView、pdfView等。一般情况下需要通过页面标签或页面模版技术将模型数据通过页面展示给用户，需要由程序员根据业务需求开发具体的页面。

**执行流程对应的代码**
1.请求到达前端控制器的第一站，先做些准备工作



```java
/**
 * Exposes the DispatcherServlet-specific request attributes and delegates to {@link #doDispatch}
 * for the actual dispatching.
 */
@Override
protected void doService(HttpServletRequest request, HttpServletResponse response) throws Exception {
   if (logger.isDebugEnabled()) {
      String requestUri = urlPathHelper.getRequestUri(request);
      logger.debug("DispatcherServlet with name '" + getServletName() + "' processing " + request.getMethod() +
            " request for [" + requestUri + "]");
   }

    //保护现场
   // Keep a snapshot of the request attributes in case of an include,
   // to be able to restore the original attributes after the include.
   Map<String, Object> attributesSnapshot = null;
   if (WebUtils.isIncludeRequest(request)) {
      logger.debug("Taking snapshot of request attributes before include");
      attributesSnapshot = new HashMap<String, Object>();
      Enumeration<?> attrNames = request.getAttributeNames();
      while (attrNames.hasMoreElements()) {
         String attrName = (String) attrNames.nextElement();
         if (this.cleanupAfterInclude || attrName.startsWith("org.springframework.web.servlet")) {
            attributesSnapshot.put(attrName, request.getAttribute(attrName));
         }
      }
   }

    //将框架相关信息存储至request，方便后面的处理器和视图用到
   // Make framework objects available to handlers and view objects.
   request.setAttribute(WEB_APPLICATION_CONTEXT_ATTRIBUTE, getWebApplicationContext());
   request.setAttribute(LOCALE_RESOLVER_ATTRIBUTE, this.localeResolver);
   request.setAttribute(THEME_RESOLVER_ATTRIBUTE, this.themeResolver);
   request.setAttribute(THEME_SOURCE_ATTRIBUTE, getThemeSource());

   FlashMap inputFlashMap = this.flashMapManager.retrieveAndUpdate(request, response);
   if (inputFlashMap != null) {
      request.setAttribute(INPUT_FLASH_MAP_ATTRIBUTE, Collections.unmodifiableMap(inputFlashMap));
   }
   request.setAttribute(OUTPUT_FLASH_MAP_ATTRIBUTE, new FlashMap());
   request.setAttribute(FLASH_MAP_MANAGER_ATTRIBUTE, this.flashMapManager);

    //请求分发
   try {
      doDispatch(request, response);
   }
   finally {
      // Restore the original attribute snapshot, in case of an include.
      if (attributesSnapshot != null) {
         restoreAttributesAfterInclude(request, attributesSnapshot);
      }
   }
}
```

## 2.开始处理请求
//通过url查找HandlerMap中最相近的key(url)，然后由key获取HandlerMapping对象

//通过处理器映射器获取处理器；

//通过查询处理器适配器获得



```java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
   HttpServletRequest processedRequest = request;
   HandlerExecutionChain mappedHandler = null;
   int interceptorIndex = -1;

   try {
      ModelAndView mv;
      boolean errorView = false;

      try {
         processedRequest = checkMultipart(request);

         // Determine handler for the current request
        //步骤3.1~3.4用于获取包含处理器Handler和拦截器AdapterIntercepters的处理器执行链HandlerExecutionChain
         mappedHandler = getHandler(processedRequest, false);
         if (mappedHandler == null || mappedHandler.getHandler() == null) {
            noHandlerFound(processedRequest, response);
            return;
         }

         // Determine handler adapter for the current request.
        //步骤4.1~4.2,根据HandlerExecutionChain中的处理器Handler获取处理器适配器
         HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());

               // Process last-modified header, if supported by the handler.
         String method = request.getMethod();
         boolean isGet = "GET".equals(method);
         if (isGet || "HEAD".equals(method)) {
            long lastModified = ha.getLastModified(request, mappedHandler.getHandler());
            if (logger.isDebugEnabled()) {
               String requestUri = urlPathHelper.getRequestUri(request);
               logger.debug("Last-Modified value for [" + requestUri + "] is: " + lastModified);
            }
            if (new ServletWebRequest(request, response).checkNotModified(lastModified) && isGet) {
               return;
            }
         }

         // Apply preHandle methods of registered interceptors.
         HandlerInterceptor[] interceptors = mappedHandler.getInterceptors();
         if (interceptors != null) {
            for (int i = 0; i < interceptors.length; i++) {
               HandlerInterceptor interceptor = interceptors[i];
               if (!interceptor.preHandle(processedRequest, response, mappedHandler.getHandler())) {
                  triggerAfterCompletion(mappedHandler, interceptorIndex, processedRequest, response, null);
                  return;
               }
               interceptorIndex = i;
            }
         }

         // Actually invoke the handler.
        //5.1~5.3通过处理器适配器HandlerApapter来调用处理器完成对请求的处理
         mv = ha.handle(processedRequest, response, mappedHandler.getHandler());

         // Do we need view name translation?
         if (mv != null && !mv.hasView()) {
            mv.setViewName(getDefaultViewName(request));
         }

         // Apply postHandle methods of registered interceptors.
         if (interceptors != null) {
            for (int i = interceptors.length - 1; i >= 0; i--) {
               HandlerInterceptor interceptor = interceptors[i];
               interceptor.postHandle(processedRequest, response, mappedHandler.getHandler(), mv);
            }
         }
      }
      catch (ModelAndViewDefiningException ex) {
         logger.debug("ModelAndViewDefiningException encountered", ex);
         mv = ex.getModelAndView();
      }
      catch (Exception ex) {
         Object handler = (mappedHandler != null ? mappedHandler.getHandler() : null);
         mv = processHandlerException(processedRequest, response, handler, ex);
         errorView = (mv != null);
      }

      // Did the handler return a view to render?
      if (mv != null && !mv.wasCleared()) {
         render(mv, processedRequest, response);
         if (errorView) {
            WebUtils.clearErrorRequestAttributes(request);
         }
      }
      else {
         if (logger.isDebugEnabled()) {
            logger.debug("Null ModelAndView returned to DispatcherServlet with name '" + getServletName() +
                  "': assuming HandlerAdapter completed request handling");
         }
      }

      // Trigger after-completion for successful outcome.
      triggerAfterCompletion(mappedHandler, interceptorIndex, processedRequest, response, null);
   }

   catch (Exception ex) {
      // Trigger after-completion for thrown exception.
      triggerAfterCompletion(mappedHandler, interceptorIndex, processedRequest, response, ex);
      throw ex;
   }
   catch (Error err) {
      ServletException ex = new NestedServletException("Handler processing failed", err);
      // Trigger after-completion for thrown exception.
      triggerAfterCompletion(mappedHandler, interceptorIndex, processedRequest, response, ex);
      throw ex;
   }

   finally {
      // Clean up any resources used by a multipart request.
      if (processedRequest != request) {
         cleanupMultipart(processedRequest);
      }
   }
}
```

### 3.1 getHandler(HttpServletRequest request)，经由HandlerMapping对象获取HandlerExecutionChain(处理器和拦截器)



``` java
/**
 * Return the HandlerExecutionChain for this request.
 * <p>Tries all handler mappings in order.
 * @param request current HTTP request
 * @return the HandlerExecutionChain, or <code>null</code> if no handler could be found
 */
protected HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception {
   for (HandlerMapping hm : this.handlerMappings) {
      if (logger.isTraceEnabled()) {
         logger.trace(
               "Testing handler map [" + hm + "] in DispatcherServlet with name '" + getServletName() + "'");
      }
      HandlerExecutionChain handler = hm.getHandler(request);
      if (handler != null) {
         return handler;
      }
   }
   return null;
}
```

### 3.2.1 getHandler(HttpServletRequest request)
经由request获取处理器，获取处理器Handler后，再获取拦截器，最后组成HandlerExecutionChain



```dart
/**
 * Look up a handler for the given request, falling back to the default
 * handler if no specific one is found.
 * @param request current HTTP request
 * @return the corresponding handler instance, or the default handler
 * @see #getHandlerInternal
 */
public final HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception {
   Object handler = getHandlerInternal(request);
   if (handler == null) {
      handler = getDefaultHandler();
   }
   if (handler == null) {
      return null;
   }
   // Bean name or resolved handler?
   if (handler instanceof String) {
      String handlerName = (String) handler;
      handler = getApplicationContext().getBean(handlerName);
   }
   return getHandlerExecutionChain(handler, request);
}
```

### 3.2.2 根据查找到的处理器Handler和request获取包含Handler和AdaptedInterceptors的HandlerExecutionChain



```java
protected HandlerExecutionChain getHandlerExecutionChain(Object handler, HttpServletRequest request) {
   HandlerExecutionChain chain = 
      (handler instanceof HandlerExecutionChain) ?
         (HandlerExecutionChain) handler : new HandlerExecutionChain(handler);

   chain.addInterceptors(getAdaptedInterceptors());

   String lookupPath = urlPathHelper.getLookupPathForRequest(request);
   for (MappedInterceptor mappedInterceptor : mappedInterceptors) {
      if (mappedInterceptor.matches(lookupPath, pathMatcher)) {
         chain.addInterceptor(mappedInterceptor.getInterceptor());
      }
   }

   return chain;
}
/**
 * Return the adapted interceptors as HandlerInterceptor array.
 * @return the array of HandlerInterceptors, or <code>null</code> if none
 */
protected final HandlerInterceptor[] getAdaptedInterceptors() {
   int count = adaptedInterceptors.size();
   return (count > 0) ? adaptedInterceptors.toArray(new HandlerInterceptor[count]) : null;
}
```

### 3.3.getHandlerInternal(HttpServletRequest request)获取Handler



```dart
/**
 * Look up a handler for the URL path of the given request.
 * @param request current HTTP request
 * @return the handler instance, or <code>null</code> if none found
 */
@Override
protected Object getHandlerInternal(HttpServletRequest request) throws Exception {
   String lookupPath = getUrlPathHelper().getLookupPathForRequest(request);
   Object handler = lookupHandler(lookupPath, request);
   if (handler == null) {
      // We need to care for the default handler directly, since we need to
      // expose the PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE for it as well.
      Object rawHandler = null;
      if ("/".equals(lookupPath)) {
         rawHandler = getRootHandler();
      }
      if (rawHandler == null) {
         rawHandler = getDefaultHandler();
      }
      if (rawHandler != null) {
         // Bean name or resolved handler?
         if (rawHandler instanceof String) {
            String handlerName = (String) rawHandler;
            rawHandler = getApplicationContext().getBean(handlerName);
         }
         validateHandler(rawHandler, request);
         handler = buildPathExposingHandler(rawHandler, lookupPath, lookupPath, null);
      }
   }
   if (handler != null && logger.isDebugEnabled()) {
      logger.debug("Mapping [" + lookupPath + "] to " + handler);
   }
   else if (handler == null && logger.isTraceEnabled()) {
      logger.trace("No handler mapping found for [" + lookupPath + "]");
   }
   return handler;
}
```

### 3.4 lookupHandler(lookupPath, request)根据给定url path和request获取Handler



```dart
protected Object lookupHandler(String urlPath, HttpServletRequest request) throws Exception {
   // Direct match?
   Object handler = this.handlerMap.get(urlPath);
   if (handler != null) {
      // Bean name or resolved handler?
      if (handler instanceof String) {
         String handlerName = (String) handler;
         handler = getApplicationContext().getBean(handlerName);
      }
      validateHandler(handler, request);
      return buildPathExposingHandler(handler, urlPath, urlPath, null);
   }
   // Pattern match?
   List<String> matchingPatterns = new ArrayList<String>();
   for (String registeredPattern : this.handlerMap.keySet()) {
      if (getPathMatcher().match(registeredPattern, urlPath)) {
         matchingPatterns.add(registeredPattern);
      }
   }
   String bestPatternMatch = null;
   Comparator<String> patternComparator = getPathMatcher().getPatternComparator(urlPath);
   if (!matchingPatterns.isEmpty()) {
      Collections.sort(matchingPatterns, patternComparator);
      if (logger.isDebugEnabled()) {
         logger.debug("Matching patterns for request [" + urlPath + "] are " + matchingPatterns);
      }
      bestPatternMatch = matchingPatterns.get(0);
   }
   if (bestPatternMatch != null) {
      handler = this.handlerMap.get(bestPatternMatch);
      // Bean name or resolved handler?
      if (handler instanceof String) {
         String handlerName = (String) handler;
         handler = getApplicationContext().getBean(handlerName);
      }
      validateHandler(handler, request);
      String pathWithinMapping = getPathMatcher().extractPathWithinPattern(bestPatternMatch, urlPath);

      // There might be multiple 'best patterns', let's make sure we have the correct URI template variables
      // for all of them
      Map<String, String> uriTemplateVariables = new LinkedHashMap<String, String>();
      for (String matchingPattern : matchingPatterns) {
         if (patternComparator.compare(bestPatternMatch, matchingPattern) == 0) {
            uriTemplateVariables
                  .putAll(getPathMatcher().extractUriTemplateVariables(matchingPattern, urlPath));
         }
      }
      if (logger.isDebugEnabled()) {
         logger.debug("URI Template variables for request [" + urlPath + "] are " + uriTemplateVariables);
      }
      return buildPathExposingHandler(handler, bestPatternMatch, pathWithinMapping, uriTemplateVariables);
   }
   // No handler found...
   return null;
}
```

### 4.1 HandlerAdapter getHandlerAdapter(Object handler)，根据Handler获取HandlerAdapter



```java
/**
 * Return the HandlerAdapter for this handler object.
 * @param handler the handler object to find an adapter for
 * @throws ServletException if no HandlerAdapter can be found for the handler. This is a fatal error.
 */
protected HandlerAdapter getHandlerAdapter(Object handler) throws ServletException {
   for (HandlerAdapter ha : this.handlerAdapters) {
      if (logger.isTraceEnabled()) {
         logger.trace("Testing handler adapter [" + ha + "]");
      }
      if (ha.supports(handler)) {
         return ha;
      }
   }
   throw new ServletException("No adapter for handler [" + handler +
         "]: Does your handler implement a supported interface like Controller?");
}
```

### 4.2 supports(Object handler)



```java
public boolean supports(Object handler) {
   return (handler instanceof Controller);
}
```

### 5.1 使用处理器完成对请求的处理



```java
public ModelAndView handle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {

   ((Servlet) handler).service(request, response);
   return null;
}
public void service(ServletRequest req, ServletResponse res)
    throws ServletException, IOException
{
    HttpServletRequest  request;
    HttpServletResponse response;

    if (!(req instanceof HttpServletRequest &&
            res instanceof HttpServletResponse)) {
        throw new ServletException("non-HTTP request or response");
    }

    request = (HttpServletRequest) req;
    response = (HttpServletResponse) res;

    service(request, response);
}
```

### 5.2 service(HttpServletRequest req, HttpServletResponse resp)



```csharp
protected void service(HttpServletRequest req, HttpServletResponse resp)
    throws ServletException, IOException
{
    String method = req.getMethod();

    if (method.equals(METHOD_GET)) {
        long lastModified = getLastModified(req);
        if (lastModified == -1) {
            // servlet doesn't support if-modified-since, no reason
            // to go through further expensive logic
            doGet(req, resp);
        } else {
            long ifModifiedSince = req.getDateHeader(HEADER_IFMODSINCE);
            if (ifModifiedSince < lastModified) {
                // If the servlet mod time is later, call doGet()
                // Round down to the nearest second for a proper compare
                // A ifModifiedSince of -1 will always be less
                maybeSetLastModified(resp, lastModified);
                doGet(req, resp);
            } else {
                resp.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
            }
        }

    } else if (method.equals(METHOD_HEAD)) {
        long lastModified = getLastModified(req);
        maybeSetLastModified(resp, lastModified);
        doHead(req, resp);

    } else if (method.equals(METHOD_POST)) {
        doPost(req, resp);

    } else if (method.equals(METHOD_PUT)) {
        doPut(req, resp);

    } else if (method.equals(METHOD_DELETE)) {
        doDelete(req, resp);

    } else if (method.equals(METHOD_OPTIONS)) {
        doOptions(req,resp);

    } else if (method.equals(METHOD_TRACE)) {
        doTrace(req,resp);

    } else {
        //
        // Note that this means NO servlet supports whatever
        // method was requested, anywhere on this server.
        //

        String errMsg = lStrings.getString("http.method_not_implemented");
        Object[] errArgs = new Object[1];
        errArgs[0] = method;
        errMsg = MessageFormat.format(errMsg, errArgs);

        resp.sendError(HttpServletResponse.SC_NOT_IMPLEMENTED, errMsg);
    }
}
```

### 5.3 doGet(HttpServletRequest req, HttpServletResponse resp)



```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp)
    throws ServletException, IOException
{
    String protocol = req.getProtocol();
    String msg = lStrings.getString("http.method_get_not_supported");
    if (protocol.endsWith("1.1")) {
        resp.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, msg);
    } else {
        resp.sendError(HttpServletResponse.SC_BAD_REQUEST, msg);
    }
}
```


## 参考文章
* https://www.jianshu.com/p/8a20c547e245