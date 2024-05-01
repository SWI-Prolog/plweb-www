---+ Comparing main memory stores

The table below compares the memory usage of a number of main-memory RDF
stores. All versions except for the last row use 64-bit infrastructure.
Only BRAHMS is more efficient, but this is a read-only store.

==
               Small SWETO Big SWETO  Univ(50,0)
Jena                   304       2669      2793
Sesame                 141       2033      3350
Sesame – OWLIM         143       1321      2597
Redland                 96       1514         –
BRAHMS                  31        461       714
SWI                     36        608       988
SWI – 32-bit            24        365       588
==
