# Using a personal library

In addition to the system library, SWI-Prolog searches app_config(lib)
for library files.  `app_config` is a SWI-Prolog _search path_ (see
file_search_path/2).   The location this resolves to depends on the OS.
We can find the locations using absolute_file_name/3.  The call below
finds the locations on a Linux system that implements the XDG file
location standard.

    ?- absolute_file_name(app_config(lib), D, [solutions(all)]).
    D = '/home/bob/.config/swi-prolog/lib' ;
    D = '/etc/xdg/swi-prolog/lib'.

Files placed in these directories can be loading as normal libraries
using e.g.,

    ?- use_module(library(mylib)).

In addition, we can add these libraries as _autoload_ libraries using
e.g.,

    ?- make_library_index('/home/bob/.config/swi-prolog/lib').

After this, any predicate exported from files in your personal library
can be called immediately, i.e., without loading any libraries
explicitly.

> We advice to use this with care.   It may be used to make the toplevel
> satisfy your daily requirements.   One must be careful that the names
> of the modules, files and toplevel predicates are sufficiently unique
> to minimize the risk for conflicts.

@see [Personal initialization file](PlInitialise.md)
