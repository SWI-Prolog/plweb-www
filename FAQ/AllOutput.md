# Help: I want the whole answer

Both the toplevel query/answer loop as the debugger abbreviate long
complex terms. They do this to avoid endless pages of output. In fact,
they write using write_term/3 which takes an option-list as argument.
The option list for answers printed by the Prolog toplevel is in the
prolog-flag `toplevel_print_options` and the one for the debugger is in
`debugger_print_options`. Initially both have the value given below:

```
?- current_prolog_flag(answer_write_options, X).

X = [quoted(true), portray(true), max_depth(10),
     spacing(next_argument)].
```

The option max_depth(10) says anything nested more then 10 levels should
be written as ``...``

## What to do?

If the system prints an answer that is abbreviated and you want to see
more, type __+__ and the system will increase the max_depth limit 10
fold for printing the answer: (the user pressed __+__ at the place the
diagram says =|[max_depth(100)]|=). Note the *|; true|*. This is used to
introduce __non-determinism__ that makes Prolog wait after the
answer. If the answer is _deterministic_, Prolog prints it with the
default settings and prompts for the next command.

```
?- atom_chars(goodbye_prolog, X) ; true.

X = [g, o, o, d, b, y, e, '_', p|...] [max_depth(100)]

X = [g, o, o, d, b, y, e, '_', p, r, o, l, o, g]
```

Use the __-__ command to reduce `max_depth` 10 fold.

The toplevel and debugger also have the commands __w__ and __p__ to
disable/enable the user portray/1 hook.   The portray/1 hook may be
defined by the user to print complex terms in a more friendly way.


## Changing default?

Add a set_prolog_flag/2 directive in your prolog personal initialisation
file (see PlInitialisation.md) to change the default the above mentioned
prolog flags.  E.g. to disable abbreviation, use:

```
?- set_prolog_flag(answer_write_options,
		   [ quoted(true),
		     portray(true),
		     spacing(next_argument)
		   ]).
```

@see portray_text/1 for displaying lists of character codes as strings.
