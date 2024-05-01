# Create a SWI-Prolog commandline extension (app)

Similar to Python's ``python -m <module> [arg ...]``, e.g. ``python -m
pip install janus_swi``, SWI-Prolog allows for adding scripts to add
commands to `swipl`.  Such commands are executed as

    swipl [prolog option ...] <app> [arg ...]

For example, to install the "add-on" (_pack_) [julian](<pack:julian>),
we can use

    swipl pack install julian

The currently known apps can be listed using

    swipl app list -l

Creating a app is similar to creating an executable as described in
RunProgram.md.  A script is turned into an _app_ by placing it in a
directory known by the _alias_ `app`.  See file_search_path/2.

@see [SWI-Prolog app scripts](<swi:pldoc/man?section=swipl-app>)
