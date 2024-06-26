# Program Development Tools

Next to using any editor capable of editing plain text files and
running SWI-Prolog in a separate window there are several options to
improve the user experience for the regular Prolog programmer.

## SWI-Prolog native development tools

### Built-in tools

The built-in tools provide a feature rich environment for developing with
SWI-Prolog. The tools are built on top of the portable XPCE graphics
system. They look outdated and the learning curve for the built-in Emacs
clone is steep. The real-time semantic highlighting greatly reduces the
number of bugs you need to fix after writing your program and the
context menu on predicates and goals make it easy to navigate your code.

  * PceEmacs.md is a GNU-Emacs clone in XPCE/Prolog, providing
  Prolog syntax highlighting based on parsing and
  cross-referencing the editor buffer. Colouring highlights variables,
  quoted entities, comments, goals (classified as
  built-in, imported, local, dynamic and undefined), predicates
  (classified as local, public and unreferenced), and file references
  (classified as existent/non-existent). PceEmacs is started using
  the predicates emacs/0, edit/0 or edit/1.

  Similar functionality is now provided for GNU-Emacs using the
  [sweep](https://eshelyaron.com/sweep.html).  See below

  * The [[graphical tracer][gtrace.md]] provides source-level
  debugging, using three views: your source, variable bindings, and
  the stack. The stack view includes choicepoints and visualises
  the effect of executing the cut!

  * The [[Execution Profiler][profile.md]] provides a graphical
  overview of call and time statistics.

  * The [[Cross Referencer][gxref.md]] analyzes dependencies in
  the loaded program and points out undefined and unused code. It
  can also generate module headers and import directives based on
  the analysis.

  * The [[Prolog Navigator][navigator.md]] provides an
  explorer-like view on a directory holding Prolog source files.
  Sources files can be expanded in the tree to show predicates,
  exports, XPCE classes and methods. Can be used to edit entities
  or enable debugging them (spy).

Both the Windows Prolog console *swipl-win.exe* and the _app_ for MacOSX
(*swipl-win*) provides a menu to access many of these facilities
directly.

We intend to allow the user to select preferred tools and combine them
with whatever they like. In other words, we don't want to force the user into
using a bulky all-in-one closed toolkit.

### SWISH (web based Prolog)

[SWISH](http://swish.swi-prolog.org) provides a web-based tool for
running Prolog. It provides a [CodeMirror](https://codemirror.net/)
based editor with server-enriched semantic highlighting based on the
same library as the above mentioned built-in editor. SWISH can display
Prolog results as tables, charts and anything supported by HTML5 and
JavaScript. SWISH *notebooks* provide functionality inspired by
[Jupyter/IPython notebook](https://ipython.org/).

SWISH provides a smooth transition starting with conventional Prolog
programs using text output. Next, HTML5 output can be added. Workflows,
tutorials, etc. can be written as notebooks that mix text, queries and
program fragments as well as embedded web applications that provide a
rich experience to non-programmers.

SWISH can run in several configurations.

  - As a public server it can be used to run harmless queries against
    a Prolog itself or a read-only database.
  - It can be installed with authentication enabled, which allows
    for running arbitrary Prolog programs.
  - Mixed, where non-authenticated users can run harmless queries and
    authenticated users can run anything.

### SWI-Prolog Editor (Windows)

Gerhard Röhner has developed an [integrated Prolog editor](<swieditor:>) in
MS-Windows following the conventions of this platform. The embedded
SWI-Prolog provides functionality similar to *swipl-win.exe*,
including the possibility to run XPCE GUI programs.

Especially for classroom usage on MS-Windows, you should consider this
version. The site also contains some demo material.

## Support in standard editors

The lack of keywords, existence of dynamic operator declarations (see
op/3), macro expansion and meta-calling make Prolog a difficult language
for generic editors and IDEs. On the other hand, switching between
editors is hard and thus most people like using one editor for all their
tasks. Below are plugins for generic editors that we are aware of.
Please let us know if you know other plugins.


### Using GNU-Emacs

Unfortunately, standard GNU-Emacs Prolog mode is very weak, especially at
handling proper Prolog indentation. The good news is that there is good
Emacs Prolog mode available as [sweep](https://eshelyaron.com/sweep.html).
This mode is similar to the built-in PceEmacs.  The mode replies on embedding
SWI-Prolog as an Emacs module.  The required _foreign library_ is bundled
with the binary distributions of Prolog.  Requires SWI-Prolog 8.5.20 or later.

### Eclipse based

  $ [Prolog Development Tool - PDT](http://sewiki.iai.uni-bonn.de/research/pdt/) :
  The PDT is a Prolog IDE provided as a plug-in for the Eclipse
  Platform. All PDT features are implemented for SWI-Prolog, most also for
  Logtalk). All native SWI-Prolog development tools (graphical tracer /
  debugger, profiler, ...) can be used within the PDT.

  $ [Prolog Development Tools - ProDT](http://prodevtools.sourceforge.net/) :
  Prolog Development Tools (ProDT) is a Prolog Integrated Development
  Environment (IDE) aiming to be as rich in functionality as the Eclipse's
  java IDE, giving the developer a single environment where it can control
  the development of a Prolog project from code edition, test execution,
  debugging, and more...

