# Implementing a REST API

REST APIs are a commonly used principle to make functionality
available on the web.  Given a REST API, web applications are
developed as client side JavaScript programs.

A REST API server is constructed upon the SWI-Prolog HTTP server
provided by library(http/http_server).  HTTP locations (REST
endpoints) are registered using http_handler/3.  An example
registration is here:

```
:- http_handler(root(user/User), user(Method, User),
                [ method(Method),
                  methods([get,post,put])
                ]).

user(get, User, Request) :-
    ...
user(post, User, Request) :-
    ...
```

Often, data is exchanged as JSON.   SWI-Prolog provides good
support for representing JSON using _dicts_ and _strings_ as
well as full IEEE float support including `NaN` and `Inf`.  A
typical handler is written as below.  See http_read_json_dict/2
and reply_json_dict/1 for details.

```
my_handler(Request) :-
    http_read_json_dict(Request, In),
	<do your computation>(In, Out),
	reply_json_dict(Out).
```

@see library(http/http_cors) to deal with CORS headers.
