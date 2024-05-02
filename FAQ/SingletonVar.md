# Warning: (File:Line): Singleton variables: [...]

This is a warning to help you with two common mistakes:

- Spelling mistakes in variables
- Forget to use/bind a variable

It indicates that there is one or more variable in the clause that
appears only once. This is never necessary as the first appearance of a
variable always succeeds with a successful binding. If this binding is
not used anywhere, nothing happens. You may compare it to gcc's warning
"statement has no effect".

But, what else do I place there? Prolog has the anonymous variable named
`_` this purpose. This variable has `no name', unifies to anything
without any effect. If `_` appears multiple times in the same term,
they refer to __distinct__ variables.

But, how do I document what I ignore? Prolog systems won't complain on
variables that start with an underscore. Thus, the variable `_Country`
won't be reported if it is singleton. Note however that where two
appearances of `_` are distinct variables, two appearances of
`_Country` are not: they are the same variable.  Trying to load a clause
holding two times `_Country` results in this warning:

```
Warning:    Singleton-marked variable appears more than once: _Country
```

But, the program I received has tons. What now? For this emergency there
is the directive style_check/1. The code below compiles silently.

```
:- style_check(-singleton).

better('SWI-Prolog', AnyOtherProlog).
```

Note: changes to the style_check/1 options are reverted at the end of
the file the directive appears in. See also [[Syntax
Notes][</pldoc/man?section=syntax>]] in the reference manual.

## Singleton variable in branch

The above singleton warnings are reported by many Prolog systems.  They
are purely _syntactical_.   In addition, SWI-Prolog also provides a
_semantical_ analysis that validates that the a variable that appears
twice actually enforces unification.  Consider the code below.  Here,
`X` is not a singleton, but it as they two statements are in different
branches, `X` does not force the same `X` in p(X) and q(X).

```
t :-
    (   p(X)
    ;   q(X)
    ).
```

Compiling this results in this warning

```
Warning: Singleton variable in branch: X
```

Note that this only applies to _branches_.  Calls to _meta predicates_
may also cause that two variables do not actually share.  This is not
reported.  For example, the code below is semantically equivalent to
the code above, but is (currently) silently compiled.

    or(A,B) :- (A;B).
	t :- or(p(X), q(X).


## Suppressing all warnings on a variable

SWI-Prolog never warns on a variable where the name starts with an
`_`, followed by a digit.  So, `_0Country` will never lead to a
warning, regardless of flags, how often this name appears in a
clause and the semantic relationship between these occurrences.
