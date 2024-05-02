# Interfacing to Python

There are currently four interfaces to Python.  Two use direct linking
and two use network communication.  These are

  - [pyswip](https://pypi.org/project/pyswip) <br>
    Pyswip is the oldest interface than embeds SWI-Prolog into Python based
	on Python's `ctype` package.
  - [Janus](https://pypi.org/project/janus-swi/) [[star.png]] <br>
    Janus is both a Python and SWI-Prolog plugin that allows for embedding
	Python into SWI-Prolog as well as the other way around.   Janus is bundled
	with SWI-Prolog for embedding Python into SWI-Prolog.  The Python module
	is available on PyPi.
  - [MQI](<swi:MQI>) <br>
    _Machine Query Interface_ is a library that makes SWI-Prolog accessible
	using JSON.  It comes with a client for Python.
  - [Pengines](https://github.com/SWI-Prolog/swish/tree/master/client) <br>
    (_Prolog Engines_) is bundled with SWI-Prolog, providing remote access
	to SWI-Prolog over HTTP.  It is the basic building block for
	[SWISH](http://swish.swi-prolog.org).  The SWISH repository provides
	pointers to client libraries in various languages, including Python.

[Janus](<pkg:janus>) is by far the most powerful of the alternatives.
It is developed with the XSB and Ciao teams, creating a de-facto
standard Python interface for several Prolog systems.  Janus provides
fast bi-directional calling between Prolog and Python.  The SWI-Prolog
version supports SWI-Prolog _dicts_, strings, unbounded integers,
rational numbers and Prolog threads.  The main disadvantage of Janus
is that it relies on the SWI-Prolog and Python C embedding API. This
implies that binaries of the interface are bound to a specific version
of Python and SWI-Prolog.
