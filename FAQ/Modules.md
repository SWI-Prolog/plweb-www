# Deal with modules

Modules provide _encapsulation_, which is particularly useful for
Prolog because the language often needs _helper_ predicates. This
implies that many predicates are there just to support the
implementation of some more generally useful predicate.

In most modern languages, importing a module adds the name of the
module to the current name space.  Subsequently we access symbols in
the module using ``<module><sep><symbol>``, where ``<sep>`` is e.g.,
`.` or `::`, etc.  To avoid having to type the long module name over
and over it is often possible to rename the module during the import,
so we get e.g. Python

```
import long_module as m
m.my_function()
```


The SWI-Prolog module system works differently.  This applies to all
Prolog systems who's module system is based on Quintus Prolog's module
system designed in the late 80s, the majority of today's popular
Prolog systems.  In these Prolog systems, importing a module __adds the
predicates__ of the module __to the current name space__.  So, after
importing the `long_module`, you can access its my_predicate/1 as

```
:- use_module(long_module).
t :- my_predicate(X).
```

The disadvantage of this is that it can lead to name conflicts if two
modules export the same predicate and it is not immediately clear from
which module a predicate is imported.  To deal with this, exported
predicates should have a fairly long descriptive name, often with a
prefix that is an abbreviation of the module name, e.g., rb_insert/4
from library(rbtrees).  As the name space for modules is flat, the
name of a module as it appears in the ``:- module(Name,Exports)``
directive should also be descriptive.   For example, avoid `util`
as it will stop your code loading together with another package
that provides a `util` module.

## Importing from (library) modules

SWI-Prolog defines 5 ways to access predicates from a (library) module

  1. __auto loading__.   This is defined for most of the standard
     library and allows calling predicates from the library
	 without any declaration.   You may define a predicate
	 with the same name, which overrules the library predicate.
  2. __:- autoload(File).__ is a more controlled version of
     general autoloading.   It does not load `File`, but registers
	 all exported predicates as first candidate for auto loading.
  3. __:- autoload(File, Imports).__ As autoload/1, the file is
     not immediately loaded.  It is used to lazily bind all predicates
	 that appear in `Imports`.  It is not allowed to define predicates
	 from Imports locally.
  4. __:- use_module(File).__ Loads `File` immediately, making all
     predicates available to be lazily activated.  I.e., it is
	 possible to define an exported predicate locally.
  5. __:- use_module(File, Imports).__ Load `File`immediately and
     imports the predicates in `Imports`.   Any other attempt to
	 define these predicates leads to an error.

Typically, (1) is practical for interactive use and prototyping.  (2)
and (4) are fairly controlled and good during development.  (3) and
(5) are good for the maintenance phase of a project where changes are
relatively infrequent.  (2) and (3) are SWI-Prolog specific and may be
used to reduce the startup time of large applications that are
executed from source.

Analysis of dependencies is provided by gxref/0, the PceEmacs command
Control-C Control-D (Dependencies) or the [GNU Emacs Sweep
mode](GnuEmacs.md) command Control-C Control-U (Undefined).  The
latter two should be synchronized.


## Dealing with predicate name conflicts

Should you still have two modules exporting the same predicate that
you wish to use in a single module, you have several options.  The
classical way is to use use_module/2, __not__ importing the
conflicting predicate.  So, if `m1` and `m2` export `p/1`, use

```
:- use_module(m1, [q/1, r/1]). % all you need __except__ p/1
:- use_module(m2, [x/2]).

t :- m1:p(X), m2:p(X).
```

The alternative is to import with a different name, e.g.

```
:- use_module(m1, [p/1 as m1_p]).
:- use_module(m2, [p/1 as m2_p]).

t :- m1_p(X), m2_p(X).
```
