# How do I enlarge the stacks?

By default, SWI-Prolog's combined stacks per thread are limited to 1Gb.
This limit is enough for most programs, while it ensures that broken
programs often terminate gently on a _resource exception_ rather than
consuming all available memory on your system.  This page gives some
tricks on reducing stack usage in case you run out and explains how
the limit may be raised.

> Note The 1Gb limit holds for the 9.3.x development series as well
> as all 64-bit editions.  Older 32-bit editions have a stack limit
> of 128Mb per stack and a combined limit that may be used to restrict
> stack usage.  Even older versions had per-stack limits.


## But, my program runs out of stack. What now?

Prune choicepoints. Deterministic programs use way less memory on all
the stacks.  There are several ways to find unwanted choicepoints.

  - While writing the program, you may wish to use the det/1 directive
    to tell the system that a predicate must succeed and leave no
	choicepoint.
  - Using SSU ([Single Sided Unification](<swi:pldoc/man?section=ssu>)),
    makes it easier to write safe _functional code_.
  - Use the SWI-Prolog [[source-level debugger][../gtrace.md]]
    to find choicepoints.
  - If a (test) query on the toplevel prompts for alternatives, there
    is a choicepoint. The system will tell where by hitting __*__.


## But I really have a lot of choicepoints and data

There are two options for enlarging the stacks.  One is from the commandline,
using e.g., the command below.  The value is in bytes, unless followed by one
of __k__, __m__ or __g__ for Kbytes, Mbytes or Gbytes.

    swipl --stack-limit=2g ...

The limit may also be enlarged at runtime using e.g., the call below.   The
value is in bytes.  The Prolog flag may be changed at any time.   Setting it
too low may result in a stack overflow.

    ?- set_prolog_flag(stack_limit, 2_000_000_000).

New threads (see thread_create/3) by default inherit the stack limit from the
thread that creates it.  Alternatively, the option stack_limit(Bytes) may be
used.
