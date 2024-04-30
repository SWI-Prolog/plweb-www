---+ Reading dynamic data from a file

It may seem attractive to use consult/1 for loading a file holding `case
data' as Prolog facts. However, this is not a very good plan.

    * Consult does a lot more work
    * Consult stores the data as static procedures 

A much better approach is to load the file by hand. If we have dynamic
data on a graph as arc/2 facts, this looks as follows.

==
:- use_module(library(error)).
:- dynamic arc/2.

load_arcs(File) :-
        retractall(arc(_,_)),
        setup_call_cleanup(
            open(File, read, Stream),
            load_arcs_from_stream(Stream),
            close(Stream)).

load_arcs_from_stream(Stream) :-
        read(Stream, T0),
        load_arcs(T0, Stream).

load_arcs(end_of_file, _) :- !.
load_arcs(arc(From, To), Stream) :- !,
        assert(arc(From, To)),
        read(Stream, T2),
        load_arcs(T2, Stream).
load_arcs(Term, _Stream) :-
        type_error(arc, Term).
==

Of course you should adapt this code to your case. This code properly
handles your code as dynamic data and doesn't allow a user of your
program to fool you by adding a term

==
arc(_, _) :- shell('format C'). 
==

@see library(persistency) allows for storing data on a file and restoring it.
