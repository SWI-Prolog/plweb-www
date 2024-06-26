---+ ClioPatria: the SWI-Prolog Semantic Web Server

SWI-Prolog offers an extensive library for loading, saving and querying
Semantic Web documents called the
[[semweb][http://www.swi-prolog.org/pldoc/package/semweb.html]] package.
Internally, the query language is `Prolog', building on top of an
efficient implementation of a predicate rdf/3 expressing the content of
the triple store.

ClioPatria provides a ready-ro-run web-server on top of this
infrastructure. The web-server contains a SPARQL endpoint, user
management and web-based tools to help the developer analysing the
loaded RDF.

    * Overview.md of ClioPatria
    * [[Rationale][whitepaper.md]] behind ClioPatria
    * QueryLanguages.md supported
    * Install.md or restart.md ClioPatria
    * Download.md ClioPatria
