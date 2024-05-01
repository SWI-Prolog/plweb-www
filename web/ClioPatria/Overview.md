---+ Overview of ClioPatria

ClioPatria is an extension of the SWI-Prolog RDF infratructure (`semweb'
package) that provides you with a   ready-to-run  web-server that can be
extended into a  full-fledged  Semantic   Web  application.  The  semweb
package provides reading and writing RDF   (XML and Turtle), storage and
querying by means of rdf(Subject,   Predicate,  Object). ClioPatria adds
the following:

    $ A SPARQL server :
    This processes HTTP SPARQL requests.  The server also includes
    support for SeRQL and the Sesame (www.openrdf.org) HTTP protocol.

    $ Reasoning libraries :
    Called entailment modules.  See entailment/README.txt

    $ User administration :
    Create users, provide OpenID services, use external OpenID
    authorization and connect users to right-tokens.

    $ A web-based developers front-end :
    This provides provides browsing the RDF, loading and unloading
    graphs, testing queries interactively, browsing the documentation of
    HTTP services and source-code.

    $ Web-page generation components :
    Server-side components to render an RDF resource or literals with
    a link to the development UI, render simple graphs, etc.

    $ Additional libraries :
    These are additional components to the http and semweb libraries
    that may become part of SWI-Prolog in the future.  Examples are
    lib/semweb/rdf_optimise.pl to optimise rdf-control-structures and
    lib/semweb/rdf_abstract.pl to transform graphs represented as
    rdf(S,P,O) terms.
