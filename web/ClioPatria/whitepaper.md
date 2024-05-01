---+ Whitepaper: The ClioPatria Semantic Web server

---++ What is ClioPatria?

ClioPatria is a [[(SWI-)Prolog][http://www.swi-prolog.org]] hosted HTTP
application-server with libraries for Semantic Web reasoning and a set
of JavaScript libraries for presenting results in a browser. Another way
to describe ClioPatria is as ``Tomcat+Sesame (or Jena) with additional
reasoning libraries in Prolog, completed by JavaScript presentation
components''.


---++ Why is ClioPatria based on Prolog?

Prolog is a logic-based language using a simple depth-first resolution
strategy (SLD resolution). This gives two readings to the same piece of
code: the _declarative_ reading and the _procedural_ reading. The
declarative reading facilitates understanding of the code and allows for
reasoning about it. The procedural reading allows for specifying
algorithms and sequential aspects of the code, something which we often
need to describe interaction. In addition, Prolog is _reflexive_: it can
reason about Prolog programs and construct them at runtime. Finally,
Prolog is, like the RDF _|triple-model|_, _relational_. This match of
paradigms avoids the complications involved with using Object Oriented
languages for handling RDF (see [[below][<#oo>]]). We illustrate the fit
between RDF and Prolog by translating an example query from
the official [[SPARQL
document][http://www.w3.org/TR/rdf-sparql-query/]]:

SPARQL:

==
PREFIX foaf:   <http://xmlns.com/foaf/0.1/>
SELECT ?name ?mbox
WHERE
  { ?x foaf:name ?name .
    ?x foaf:mbox ?mbox }
==

Below we define this query as a Prolog _predicate_.  The translation
is natural and compact.  The query is expressed as a Prolog program
rather than a string.  This ensures that Prolog can reason about it:
it validates the syntax and verifies the dependencies between this
code fragment and the remainder of the application. See
[[Wikipedia][http://en.wikipedia.org/wiki/Prolog]] if you need some
introduction to the language.

==
:- rdf_register_ns(foaf, 'http://xmlns.com/foaf/0.1/').

name_mbox(Name, MBox) :-
	rdf(X, foaf:name, literal(Name)),
	rdf(X, foaf:mbox, MBox).
==

We can run this query interactively from the terminal as illustrated
below. Here, the `=|;|=' is typed by the user asking for another
solution and the final `=|.|=' indicates there are no more solutions.

==
?- name_mbox(Name, MBox).
Name = 'Johnny Lee Outlaw',
MBox = 'mailto:jlow@example.com' ;

Name = 'Peter Goodguy',
MBox = 'mailto:peter@example.org'.
==

Returning all solutions is all that is provided by the SPARQL query.
However, our program is capable of doing more because it describes the
_logical_ relation ``_Name_ is the name of an entity that has mailbox
_MBox_''. Therefore, we can ask:

==
?- name_mbox('Johnny Lee Outlaw', X).
MBox = 'mailto:jlow@example.com'.
==

This is _different_ from a loop over the resuls from the SPARQL query
because the query does not iterate over all name-mailbox tuples, but
only over those that have a resource with a name-property with the value
=|'Johnny Lee Outlaw'|=.  Finally, we can use the relation as a boolean
test:

==
?- name_mbox('Johnny Lee Outlaw', 'mailto:peter@example.org').
false.
==

Prolog's resolution technique has created a powerful building block for
more complex queries from this simple translation of the SPARQL query.
We can use this to create more complex queries. E.g., if we want to send
a personalised message to all members on a mailinglist, we need the
members and their names. The code below combines a simple statement
query with the already-defined relation name_mbox/2.

==
employee_name_email(List, MBox, Name) :-
	rdf(List, list:member, MBox),
	name_mbox(Name, MBox).
==


---+++ Optimising queries?

Above, we used simple Prolog SLD resolution to join RDF statement
queries. Proper RDF query language implementation perform optimisation.
Here we can exploit Prolog's _reflexive_ capabilities. The code below
reorganises the conjunction of the two rdf/3 goals to achieve optimal
performance dynamically. This optimisation is based on the database
dynamics _and_ which arguments are given (_instantiated_). E.g., if we
call this relation with a given MBox it will swap the two RDF
statements.

==
:- use_module(serql(rdf_optimise)).

name_mbox(Name, MBox) :-
	rdf_optimise((rdf(X, foaf:name, Name),
		      rdf(X, foaf:mbox, MBox)),
		     Goal),
	call(Goal).
==

---+++ Our benefits?

    * The single primitive rdf(Subject, Predicate, Object) (rdf/3)
    suffices to realise all the basic graph-pattern matching that
    can be done in SPARQL.

    * We can give a name to a query (as name_mbox/2 above) and build
    complex queries from simple ones. This greatly simplifies
    maintenance of complex queries.

    * Optimisation and unfolding can be used to achieve optimal
    performance at small cost.

    * Instead of the predefined SPARQL and SeRQL functions and
    conditions, we can apply any Prolog predicate as condition or
    function anywhere in the query.  We can also introduce other
    relations (e.g., from an RDBMS) into our predicates.

    * The RDF store is tightly connected to Prolog.  This allows
    for arbitrary reasoning with and exploration of the RDF graph
    at low cost.


---+++ [oo] How does this compare to using Java?

Above, we compared querying the triple-store in Prolog with SPARQL. What
if we compare Prolog to using Sesame/Jena as a library? The marriage
between Object Oriented systems and relational data in general and RDF
in particular is discussed in [[ActiveRDF: embedding Semantic Web data
into object-oriented
languages][http://linkinghub.elsevier.com/retrieve/pii/S1570826808000401]].
Roughly, static languages such as Java allow for three approaches. Each
of these either require setting up an _enumerator_ or dealing with
_sets_.

  1. GetStatement(): Query statements based on a pattern. This is
  comparable to what our Prolog based approach does, but in our approach
  a single call deals with all possible patterns dynamically. In Java we
  have to find what is given and loop through the bindings for the
  remaining values explicitely.

  2. GetObject(): Query resources. In this schema an initial URI is used
  to create an object that reflects the URI. Methods on this object
  values on a given predicate. Note that this predicate must be
  specified as a string and thus escapes the analysis of the compiler.

  3. Create an enumerator from a SPARQL query provided as a string.
  This approach again uses a string.  Building this string is
  cumbersome and vulnerable to script injection (a security risc).

_Joining_ results from any of these three possibilities requires
hand-crafted (nested) loops. Statically typed Object Oriented languages
cannot easily overcomes these problems. For dynamically typed languages
such as [[Ruby][http://www.ruby-lang.org/]], the situation can be
improved significantly as demonstrated by the
[[ActiveRDF][http://www.activerdf.org/]] project. ActiveRDF abstracts
from the RDF store and builds upon a well-established web-application
development platform, but its handling of RDF is still cumbersome
compared to what a relational language such as Prolog can achieve.


---++ What does ClioPatria provide?

This section gives the highlights of the functionality you can find in
ClioPatria.


---+++ Core SWI-Prolog libraries

    $ Web-application development :
    Developing a dynamic web-page is easy: register a predicate
    as a handler for an HTTP `file'.  The predicate writes a
    document that conforms the the CGI specification and the
    server infrastructure takes care of the rest.  In the file
    mbox.pl, we defined three ways to generate a table of names
    and mailboxes.

    $ RDF storage :
    The main-memory store is a natural extension to Prolog.  It
    is [[memory-efficient][memusage.txt]].  The RDF store provides:

	* Reliable file-based persistency
	* Load and unload of data-sources
	* Full persistent history of modifications

    $ Full text search :
    Using rdf_find_literals/2, the use can query literals that
    contain words. The literal-search facility allows for
    searching tokens and prefixes as well as fuzzy search
    (case-insensitive, stemming, lounds-like (metaphone))
    and numerical search (exact, larger, smaller, range).

---+++ ClioPatria extensions

    $ SeRQL/SPARQL endpoint :
    Although generally not used for application development,
    the compliant RDF query endpoints make ClioPatria a possible
    component in Semantic Web applications that use these endpoints.

    $ Linked Open Data serer :
    Serve RDF repositories or fragments thereof as LOD with a single
    line declaration.


---++ Running ClioPatria

You need two things to run ClioPatria: the ClioPatria sources and
a recent version of SWI-Prolog that fits your computer.  If you
want thumbnail support to show images, you also need =convert=
from the ImageMagic project.  Here are the URLs for downloading:

    * http://www.swi-prolog.org/we/ClioPatria/
    * http://www.swi-prolog.org
    * http://www.imagemagick.org/

ClioPatria runs on all major platforms supported by SWI-Prolog: Windows
(32- and 64-bits), MacOSX, Linux (32- and 64-bits) and, from source,
almost any Unix system.
