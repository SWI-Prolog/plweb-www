---+ RDF Applications with Prolog

This tutorial is an updated version of [[RDF Applications with Prolog
][http://www.xml.com/pub/a/2001/07/25/prologrdf.html]] by [[Bijan
Parsia][http://www.cs.manchester.ac.uk/~bparsia/]], published in 2001 in
[[XML.com][http://www.xml.com/]]. Changes to the original are mostly
limited to layout and details needed to run the examples on a recent
SWI-Prolog version. Loading RDF data has been extended to load from HTTP
sources.

In the [[first
article][http://www.xml.com/pub/a/2001/04/25/prologrdf/index.html]] in
this series, I explained some of the semantics of RDF via Prolog (and
vice versa). In this article, I'll explore some of the nitty-gritty of
working with RDF in Prolog using the SWI-Prolog system.


---++ Using RDF with SWI-Prolog

SWI-Prolog is a fast, robust, and free open-source Prolog system with
great support for XML and RDF. It's being used as an inference engine
for Mozilla and in several other RDF projects. With the release of
SWI-Prolog 4.0.0 the graphics, GUI, and object library XPCE have been
bundled in. XPCE is a rich and powerful cross-platform (Windows, Unixen
and MacOSX) toolkit with a number of immediately useful demos, including
various drawing systems, a partial HTML renderer, a help system, and an
Emacs clone.

All in all, a wonderful system both for play and for serious work, and
for play that becomes serious work!

A good example application of SWI-Prolog's RDF support is the
[[Europeana][http://www.europeana.eu]]
[[ThoughtLab][http://eculture.cs.vu.nl/europeana/session/search]],
providing semantic search through cultural heritage collections.


---++ First Steps with SWI-Prolog's RDF Tools

SWI-Prolog comes bundled with several modules for parsing RDF/XML and
manipulating the result at various levels of detail and convenience.
Assuming you have a SWI-Prolog 5.8.x installation running, you can load
the bundled modules by typing at the "command", (i.e., query), prompt:

    ==
    ?- [library(rdf)].
    ==

and hitting enter. On my machine, it prints back:

==
%    library(error) compiled into error 0.00 sec, 17,688 bytes
...
%  rdf_parser compiled into rdf_parser 0.02 sec, 139,592 bytes
%   library(gensym) compiled into gensym 0.00 sec, 7,120 bytes
%  rdf_triple compiled into rdf_triple 0.00 sec, 38,088 bytes
% library(rdf) compiled into rdf 0.06 sec, 641,000 bytes
==

In other words, all the modules on which the RDF library depends get
loaded. The library(sgml) module handles SGML, HTML, and XML parsing,
and it's quite nifty in its own right.

In Prolog lingo, to load a file that contains a knowledge
base/list-of-definitions is to consult it. The square brackets are just
a bit of syntactic sugar for this process. The consulting involves
reading each clause, perhaps doing a bit of processing on the read
terms, and then asserting the clause into the Prolog knowledge base.
Consulting a file puts all of its predicates right into the global
knowledge base, which can be a problem if there are conflicts.
Fortunately, SWI-Prolog has a module system and, as one can see above,
facilities for indicating and managing dependencies. Thus, it might have
been better to have used use_module(library(rdf)). instead of (the
syntactic sugar for) consult(library(rdf). above, but in the current
context it doesn't really matter.

Prolog predicates are distinguished by name and arity (i.e., number of
permissible arguments). So you'll see things like format/2,
format/3, etc. Each of these is a completely different
predicate. This may feel odd to folks used to the possibility of having
optional and defaulted arguments (e.g., as in Python), but it works out
very well in practice.

At this point, I can parse an RDF/XML document into a list of Prolog
terms using the (now consulted) predicate load_rdf/2. I'm going to use
as my example an [[RSS 1.0 file from
XMLhack.com][http://xmlhack.com/rss10.php]] after saving this to disk
from the browser.

==
?- load_rdf('xmlhack.rss', List_of_RDF_statements).
List_of_RDF_statements = [rdf('http://xmlhack.com/rss10.php',
'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
'http://purl.org/rss/1.0/channel'), rdf('http://xmlhack.com/rss10.php',
'http://purl.org/rss/1.0/title', literal('XMLhack')),
rdf('http://xmlhack.com/rss10.php', 'http://purl.org/rss/1.0/link',
literal('http://xmlhack.com/')), rdf('http://xmlhack.com/rss10.php',
'http://purl.org/dc/elements/1.1/source', 'http://xmlhack.com/'),
rdf('http://xmlhack.com/rss10.php',
'http://purl.org/rss/1.0/description', literal(' Developer news from the
XML community\n ')), rdf('http://xmlhack.com/rss10.php',
'http://purl.org/dc/elements/1.1/language', literal('en-us')),
rdf('http://xmlhack.com/rss10.php',
'http://purl.org/dc/elements/1.1/publisher', literal('Edd Dumbill
(mailto:webmaster@xmlhack.com)')), rdf('http://xmlhack.com/rss10.php',
'http://purl.org/dc/elements/1.1/creator',literal(...)), rdf(..., ...,
...)|...].
==

I've not yet "consulted" the RDF file, I've merely parsed it into a list
of terms. What's the difference? For one, none of these statements can
be queried, e.g.,:

    ==
    ?- rdf(X,Y,Z).
    ERROR: toplevel: Undefined procedure: rdf/3 (DWIM could not correct goal)
    ==

Thus far, I haven't ever (in this session) asserted any clause of an
rdf/3 predicate, so the system has no special understanding of terms
like rdf('http://xmlhack.com/rss10.php', rdf:type,
'http://purl.org/rss/1.0/channel). But, in the symbolic processing
language tradition, that term is a well-formed data structure (indeed,
it's a "term"), and it can be manipulated in various ways -- including
being asserted as a clause of a predicate. In other words, Prolog has a
uniform representation of code and data and facilities for manipulating
a term from either perspective. Since load_rdf/2 returned a list of
terms that are perfectly legal Prolog clauses, it's no problem to assert
them into the current knowledge base, simply using the assert/1
predicate.


==
?- load_rdf('rss10.php', [H|_]), assert(H).
==

Both the file at that relative path must be parseable into a list of
terms with at least one item. The first item is bound to H, while the
tail of the list is bound to the "anonymous", "throw away", or "don't
care" variable "_" and (remember a comma between predicates in a query
is read as "and") that first term must be entered in our knowledge base.

==
H = rdf('http://xmlhack.com/rss10.php',
	'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
	'http://purl.org/rss/1.0/channel').
==

The query succeeded with the first parsed item from the document is bound to H.

==
?- rdf(X,Y,Z).
==

Are there any X, Y, and Z that exist in an rdf relation?

==
X = 'http://xmlhack.com/rss10.php'
Y = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
Z = 'http://purl.org/rss/1.0/channel'.
==

Yes, there's one with the listed bindings!

Two points. First, using load_rdf/2, I can transform a certain
serialization of a set of RDF statements into a form that Prolog can
handle well (i.e. a list of rdf/3 based terms). Second, given the
appropriate output predicates, I can use that form to compose RDF as
well. After all, I can assert any rdf/3 statement that I'd like at the
query prompt, e.g.,

    ==
    ?- assert(rdf(a, b, c)).
    true.
    ==

And I can test to see if it's in fact in the knowledge base:

    ==
    ?- rdf(a, b, c).
    true.
    ==

Since that's not a particularly useful RDF statement, I'll just retract
it:

    ==
    ?- retract(rdf(a, b, c)).
    true.

    ?- rdf(a, b, c).
    false.
    ==

I really don't want to assert these statements tediously one at a time
at the query prompt. But I can get a list of the rdf/3 terms, which
suggests that I could use some sort of "mapping" predicate to assert all
the items in the statement list. maplist/2 takes a predicate and
applies it to each member of a supplied list:

    ==
    ?- load_rdf('xmlhack.rss', List_of_RDF_statements),
       maplist(assert, List_of_RDF_statements).
    List_of_RDF_statements = [rdf('http://xmlhack.com/rss10.php ...
    ==

After this query, I have quite a few RDF statements in my Prolog
knowledge base.  Note that if Prolog waits with the caret behind
an answer, you can type *|;|* to get the next answer or hit the
_return_ key if you are satisfied.

    ==
    ?- rdf(X,Y,Z).
    X = 'http://xmlhack.com/rss10.php',
    Y = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
    Z = 'http://purl.org/rss/1.0/channel' ;
    X = 'http://xmlhack.com/rss10.php',
    Y = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
    Z = 'http://purl.org/rss/1.0/channel' ;
    X = 'http://xmlhack.com/rss10.php',
    Y = 'http://purl.org/rss/1.0/title',
    Z = literal('XMLhack') ;
    X = 'http://xmlhack.com/rss10.php',
    Y = 'http://purl.org/rss/1.0/link',
    Z = literal('http://xmlhack.com/') .
    ==

This is equivalent to consulting a file containing all the rdf/3 items,
written just as they appear in the list. Thus, one could use the rdf/3
notation to compose RDF documents (although this notation isn't all that
much more convenient than the dreaded RDF/XML).

---++ The library semweb/rdf_db

In the previous section, I gave some examples of reading into the Prolog
knowledge base a set of RDF statements. Jan Wielemaker (the author of
SWI-Prolog) put together a little module of convenience predicates for
doing this sort of thing, called rdf_db. One very nice feature of rdf_db
is that it allows you to maintain multiple, RDF _|named graphs'. You can
have the advantages of dealing with RDF documents as separate lists of
statements while having a Prologesque interface. rdf_db is also a good
example of a simple Prolog-based RDF application.

To get going with rdf_db, we must first restart Prolog because rdf_db
provides a conflicting definition for the rdf/3 predicate. Now, we load
the RDF database infrastructure and a plugin that allows for downloading
RDF from the web:

    ==
    ?- [library(semweb/rdf_db)].
    ?- [library(semweb/rdf_http_plugin)].
    ==

The highly confusingly named rdf_load/1 will open a file or URL, parse
the RDF/XML into rdf/3 based terms, and then asserts them into an RDF
named graph, by default created from the URL from which we loaded the
data:

    ==
    ?- rdf_load('http://xmlhack.com/rss10.php').
    % Parsed "http://xmlhack.com/rss10.php" in 0.01 sec; 73 triples
    true.

    ?- rdf(X,Y,Z).
    X = 'http://xmlhack.com/rss10.php',
    Y = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
    Z = 'http://purl.org/rss/1.0/channel' ;
    X = 'http://xmlhack.com/rss10.php',
    Y = 'http://purl.org/rss/1.0/title',
    Z = literal('XMLhack') ;
    X = 'http://xmlhack.com/rss10.php',
    Y = 'http://purl.org/rss/1.0/link',
    Z = literal('http://xmlhack.com/') .
    ...
    ==

Most of the predicates in rdf_db have two variants, the basic one and
one with an extra argument. The extra argument specifies the particular
RDF named graph which is to be the context of the predicate. Without
that argument, the predicate is evaluated over the union of all named
graph. Given [[Open Linked Data][http://linkeddata.org/]], we load
information about Amsterdam:

    ==
    ?- rdf_load('http://dbpedia.org/resource/Amsterdam').
    % Parsed "http://dbpedia.org/resource/Amsterdam" in 0.41 sec; 2,426 triples
    true.

    ?- rdf_graph(Graph).
    Graph = 'http://xmlhack.com/rss10.php' ;
    Graph = 'http://dbpedia.org/resource/Amsterdam' ;
    false.

    ?- rdf(S, P, literal('Amsterdam')).
    S = 'http://dbpedia.org/resource/Amsterdam',
    P = 'http://www.w3.org/2000/01/rdf-schema#label' ;
    S = 'http://dbpedia.org/resource/Amsterdam',
    P = 'http://www.w3.org/2000/01/rdf-schema#label' ;
    S = 'http://dbpedia.org/resource/Amsterdam',
    P = 'http://www.w3.org/2000/01/rdf-schema#label' .
    ...

    ?- rdf(S, P, literal('Amsterdam'), 'http://xmlhack.com/rss10.php').
    false.
    ==

In the previous section, when I asserted the terms returned by
load_rdf/2, those terms were of the form rdf(Subject,Predicate,Object),
and that was how they were entered into the Prolog database. With
rdf_db, the rdf/3 predicate is, in fact, a rule! Each ground level rdf
statement is asserted as rdf/4 so that each statement's "provenance" can
be determined (by the fourth argument). This is, of course, merely an
implementation detail.  In fact, rdf/4 is defined as `foreign' rule and
transparently accesses a highly optimized storage subsystem written in
the *C* language.

The rdf_db library also has convenience predicates for asserting and
retracting RDF statements, either from the default RDF named graph or
from a named one. Perhaps more importantly, rdf_register_ns/2 assigns
prefixes to URIs in the standard XML namespace way but also permits the
use of prefixed names ("QNames") in Prolog statements:

    ==
    ?- rdf_register_ns(dbr, 'http://dbpedia.org/resource/'),
       rdf_register_ns(dbp, 'http://dbpedia.org/property/').
    true.

    ?- rdf(dbr:'Amsterdam', dbp:pushpinMap, O).
    O = literal(lang(en, 'Netherlands')).

    ?- rdf_assert(dbr:'Amsterdam', dbp:score, literal('10')).
    true.

    ?- rdf_save('Amsterdam.rdf',
		[ graph('http://dbpedia.org/resource/Amsterdam') ]).
    % Using namespace id ns1 for http://dbpedia.org/ontology/Place/
    ...
    % Saved 2,426 triples about 955 subjects into Amsterdam.rdf
    true.
    ==

The rdf_save/1 and rdf_save/2 predicates will use the namespace
declarations established by rdf_register_ns/2. RDF/XML requires
namespaces for predicates, so the library invents namespaces ns<N> for
all not-declared prefixes.

The library semweb/rdf_portray does the reverse, displaying the long
names as "QNames" by defining rules for the Prolog portray/1 predicate.

    ==
    ?- [library(semweb/rdf_portray)].
    %  library(semweb/rdfs) compiled into rdfs 0.01 sec, 27,984 bytes
    % library(semweb/rdf_portray) compiled into rdf_portray 0.01 sec, 42,312 bytes
    true.

    ?- rdf(dbr:'Amsterdam', P, O).
    P = dbp:demography12colProperty10,
    O = literal(type(xsd:integer, '1879'))
    ...
    ==


---++ A Transformation Example

The XML serialization of RDF (known as RDF/XML) is both a boon and a
bane. Part of the bane is common to many XML-based languages: it's just
plain ol' nasty to read and write. Part of the boon is, of course, that
there is an ever-growing pool of tools and techniques for dealing with
XML-based languages. One of the foundational techniques for dealing with
XML is the structural transformation of XML documents. The standard (if
not the best) tool is XSLT. Thanks to RDF/XML, one can manage RDF
documents/knowledge bases using XSLT stylesheets.

Prolog, as a symbolic processing language, is perfectly capable of doing
straightforward tree transformations, and this a perfectly reasonable
way to use it. However, it's not quite in the spirit of RDF. Structural
transformation is syntactically focused (albeit on abstract syntax),
whereas RDF is supposed to be the foundation of the "Semantic" Web.
Given such, one might expect it to take an inference-based approach.
With structural transformation, one concentrates on the shape of the
tree. With inference based "transformation", one concentrates on the
implications of the knowledge base.

What does this mean in practice? When I sit down to write an XSLT script
to generate HTML from an RSS 1.0 document, there are two basic sorts of
where-ish questions I ask: "Where do I find the elements I want in the
source tree?" and "Where do they go in the result tree?" Answers to the
first sort of question are typically going to be XPath queries, whereas
answers to the second will be templates, element constructors, and the
like. Though in an XSLT script, querying and result building are
intertwined, clearly they are conceptually distinct aspects of the
transform. But in each case, I'm still walking the trees. My script is
sensitive to the position of the elements (and attributes, and...) in
the tree, and not to their meaning.

Contrariwise, when writing a Prolog script to generate HTML from an RSS
1.0 document, I don't care about how the elements were arranged -- what
was which's parent, and so on -- but rather on what the document
expresses, and what conclusions I could draw from it. At least that's
true for the querying part: since HTML isn't itself a knowledge-oriented
system, a structural approach to its generation makes perfect sense. It
would be different if I were "transforming" one knowledge base into
another. In that case, I would conceive the problem in terms of how the
second knowledge base should learn from the first. To help us with the
problem of creating a structured result, Prolog (and SWI-Prolog in
particular) has a wonderful facility for generating result trees, the
Definite Clause Grammar (DCG). My use of DCGs to generate HTML is
precisely analogous to using XSLT templates, with Prolog predicates
serving the role of XPath expressions.


---++ Definite Clause Grammars

Generally, one uses a declarative language when one has a problem that's
well described by some formalism, and it is very tedious to generate, by
hand, a computer program that will implement such descriptions. For
example, the parser generator YACC implements a declarative language for
describing context free grammars (CFGs), and it will generate the
requisite nasty C code for a parser that will recognize sentences which
adhere to those grammars. In essence, one tells YACC "write me a parser
that can parse sentences conforming to this grammar". And one does this
because it's relatively easy to understand and modify the formalistic
description, especially when compared to hacking around with large
symbol tables for finite state automata. An even more familiar formalism
is that of regular expressions.

The formalism that Prolog implements is extremely expressive, so much so
that it can pretty much directly express CFGs. That is, it's
straightforward to write a Prolog program that looks very much like a
standard BNFesque description of a CFG. Being a Prolog program, it is
executable, and will happily parse sentences that conform to the
grammar. It can even generate conformant sentences, given the right
seeds. This suggests that in order to generate HTML, I imagine what I
want the resultant HTML page (think of the page as a "sentence") to look
like, write a grammar for that page just as if I were trying to parse
some similar page to scrape it for data, and feed that Prolog grammar
the bits it needs to write a such a page, only using the data I supply
(in this case, via queries of my knowledge base created with the RSS
document).

While I could write the grammar in straight Prolog, there are several
bits of housekeeping a straight Prolog program would require that will
just clutter things up. Thus, most Prolog systems add a bit of syntactic
sugar to manage the repetitive stuff, the DCG notation. SWI-Prolog goes
further and provides a DCG library for HTML generation, html_write.

To build the HTML page, I need to write a grammar describing the
structure of that page (actually, that class of pages; the grammar is
very much like a template). For our RSS->HTML renderer, the first step
is to come up with a symbol which represents the page as a whole (the
"start" non-terminal), in this case I'll use rss_html_list. Any
rss_html_list is going to consist of a page of HTML, obviously, and
html_write gives me a grammar rule for generating HTML pages, page/2.
So, my template's basic form looks like:

    ==
    rss_html_list -->
           page(...,
    	    ...).
    ==

The "-->" is the DCG operator; it works somewhat analogously to the ":-"
operator, except that the body of the rule is expecting DCG predicates
(i.e., ones defined with "-->") instead of regular Prolog predicates. In
the normal case. "-->" can be read as "expands to" or "consists of". The
first for page/2 specifies the HTML <head> content and the second the
<body> content. If I were constructing a full grammar for rss_html_list,
I'd expect to find a rule in it with page as its head. This rule is
already defined by html_write, so I don't have to do it myself. The
arguments allow me to customize the page production rules without
modifying any of its actual clauses. Instead, I pass it little chunks of
grammar (encapsulated as DCGs) which page tucks into the right places in
its definition:

    ==
    rss_html_list -->
	page(\rss_list_head,
	     \rss_list_body).
    ==

(The leading slash is a convention of the html_write library that
indicates that the rest of the atom is the name of a grammar rule.)

The "head" of the final page needs a title element. To create HTML
elements, html_write supplies a DCG predicate for the case, html/1 which
takes a list of element "specifications" (the leading slash convention
is one kind of specification that html/1 understands). The specification
for a simple element with just textual content is of the form
element_name(content).

    ==
    rss_list_head -->
	html([title('XMLhack')]).
    ==

It's a little annoying to have the title hardcoded like that, so I'll
add an argument to the predicate:

    ==
    rss_list_head(PageTitle) -->
	html([title(PageTitle)]).
    ==

This will do for the head. I want the body of the page to have a header,
centered, and then an unordered list of the RSS 1.0 items. Since I want
to use the title of the page as the header of the body as well, I'll
give rss_list_body an argument too.

    ==
    rss_list_body(Header)-->
	html([h2([align=center],[Header]),
	%Note that the "h2" spec takes *two* lists as args,
	%the first being the attributes, which can be spec'ed
	%either as name=value, or name(value).
	ul(\rss_list_items(Items))] ).
    ==

Both the head and body clauses need to get a value passed to them. In
this case, I'm going to pass the buck up to the caller of rss_html_list:

    ==
    rss_html_list(ChannelTitle) -->
	page(\rss_list_head(ChannelTitle),
 	     \rss_list_body(ChannelTitle)).
    ==

That's fine for the page head, but the body clause still has that
mysterious variable Items. To fill in that hole I need to make a query,
and I intend to use rdf/3, a normal Prolog predicate, not a DCG rule, to
make it. Thus, some sort of escaping device needs to be employed. For
DCGs, stuff inside curly brackets {} is not treated as DCG clauses (and
not expanded in the usual way -- see any Prolog text for details):

    ==
    rss_list_body(Header) -->
	{...},
	%A query goes in there! Some predicates which bind Items.

	html([ h2([align=center], [Header]),
	       ul(\rss_list_items(Items))
	     ]).
    ==

I expect that the query which binds Items will bind a list of items, so
rss_list_items needs to handle it. A simple recursive rule will take
care of that:

    ==
    rss_list_items([First_item|Rest_of_items]) -->
	html([li([\list_item_content(First_item)])]),
	rss_list_items(Rest_of_items).

	rss_list_items([]) --> [].
	%The base case: If the list is empty, just return an empty list.
    ==

The final two production rules are simple, although both involve
queries:

    ==
    list_item_content(Item) -->
	{...},? %A query that fetches the Item's Description.
	html([\item_link(Item), br([]), Description]).

    item_link(Item) -->
	{...}, %A query that fetches the item's Link and Title.
	html(i(a(href(Link),Title))).
    ==

That's it the template aspect of the grammar.

---++ Back to the Queries

The grammar needs three queries to be complete. The content and link
queries are quite straightforward. I only expect one result in each
case, so simple calls to rdf/3 will do the job:

    ==
    list_item_content(Item) -->
	{ rdf(Item, dc:description, literal(Description))
	},
	html([\item_link(Item), br([]), Description]).

    item_link(Item) -->
	%This is a conjunctive query, though each conjunct is independent.
  	{ rdf(Item,rss:link,literal(Link)),
	  rdf(Item,rss:title,literal(Title))
	},
	html(i(a(href(Link),Title))).
    ==

These queries are very simple. No need to walk up or down a tree. No
need to think of how the information is encoded. Items have
dc:descriptions, rss:links, and rss:titles -- to find out the
description, link, and title for an item, we just ask.

Alas, this isn't entirely the case, as I'm sticking pretty close to the
bare RDF metal here, and even to the particular representation of RDF
given in rdf_db. I could encapsulate the ways of determining the title
and links of an RSS item in more pleasing predicates, which would also
allow us to change the way they were determined without affecting our
template.

    ==
    rss_title(Item, Title) :-
	rdf(Item, rss:title, literal(Title)).
    rss_link(Item, Link) :-
        rdf(Item, rss:link, literal(Link)).
    ==

The query for rss_list_body is more complex. The basic form is clear: I
want the rss:items, so I ask for rdf(Item, rdf:type, rss:item). But this
only gives me the first rss:item found. I need to say, "Give me, in a
list, all the values that satisfy this query". There are several
predicates that have this or similar meaning. In this case, I'll use
findall/3, followed by sort/2 to eliminate duplicates:

    ==
    findall(Item,	% The variable which gets bound to the desired value.
            rdf(Item, rdf:type, rss:item), % The query.
            Items),	% The variable that gets bound to a list of the results.
    sort(Items, Unique)
    ==

This, when popped into rss_list_body, completes the transforming
grammar.

---++ DCGs Compared to XSLT

To use the transforming grammar requires a bit more infrastructure. In
this case, I wrote a predicate, rss_to_html_list/3, which loads up an
RSS 1.0 file, invokes the grammar to generate the HTML, then writes it
all to a specified file. I could call it from a GUI front end or just
package it up in a shell or CGI script. I backtranslated the grammar
into an XSLT stylesheet. Comparing the two is instructive.

---+++ Boilerplate setup and namespace declarations

    ==
    :- use_module(library(rdf_db)).
    :- use_module(library(html_write)).

    rdf_register_ns(rss, 'http://purl.org/rss/1.0/'),
    rdf_register_ns(dc,  'http://purl.org/dc/elements/1.1/'),

    ==

vs.

    ==
    <?xml version="1.0" encoding="iso-8859-1"?>
    <xsl:stylesheet version="1.0"
		    xmlns:rss="http://purl.org/rss/1.0/"
		    xmlns:dc="http://purl.org/dc/elements/1.1/">
    ==

---+++ Rolling

The first line corresponds to a command line option designating the
source document. rdf_load/1 parses the file and creates an in-memory (in
this implementation) representation of the RDF statments that may be
queried by means of appropriate predicates (like rdf/3). An XSLT
processor would take the designated file and parse it into an in-memory
representation (typically) -- often a DOM tree -- which may be queried
by means of appropriate XPath expressions.

The second line is a query which grabs a value and binds the variable
Title to it.

    ==
    rss_to_html_list(Resource, Source, Target) :-
	rdf_load(Source),
	rdf(Resource, rss:title, literal(Title)),
	...
    ==

This is roughly equivalent to

    ==
    <xsl:variable name="title"
	select="rdf:RDF/rss:channel/rss:title"/>
    ==

One point of interest: Binding and referencing variables in XSLT is
fairly painful. It's not just that it's nastily verbose (okay, it's
mainly that it's nastily verbose), but that there are lots of different
rules and contexts for getting back the value. Aside from that, XSLT has
a fairly straightforward "assignment" model of binding (explicit)
variables. The Prolog variable is (1) structural (i.e., the variable is
just a "hole" in the larger term, and (2) the variable is "two-way"
(i.e., you can pass a value to the query by that variable or get one out
through it).

---+++ Setting up the output

First line causes the DCG to be evaluated and the result bound to
TargetHtml. Second line opens the result file for writing (both of these
probably fall in the scope of command line option or calling function
stuff for XSLT). print_html/1 is an html_write convenience predicate
which takes the result tree from the DCG grammar and serializes it in
standard HTML format.

    ==
	phrase(rss_html_list(Title), TargetHtml),
	tell(Target),
	print_html(TargetHtml),
	told.
    ==

vs.

    ==
    <xsl:output method="html"/>

    <xsl:template match="/">
        <html>
        ...
        </html>
    </xsl:template>
    ==

    ==
    rss_html_list(ChannelTitle) -->
	page(\rss_list_head(ChannelTitle),
             \rss_list_body(ChannelTitle)).

    ==


---+++ Creating the overall page skeleton

    ==
    rss_list_head(PageTitle) -->
	html([title([PageTitle])]).

    rss_list_body(Header) -->
    	{ findall(Item,
		  rdf(Item, rdf:type, rss:item),
                  Items)
	  sort(Items, Unique)
        },

	html([ h2(align(center),[Header]),
               ul(\rss_list_items(Unique))
	     ]).
    ==

vs.

    ==
    <head>
     <title>
      <xsl:value-of select="$title"/>
     </title>
    </head>

    <body>
	 <h2 align="center">
	   <xsl:value-of select="$title"/>
	 </h2>
	 <ul>
	   <xsl:apply-templates
	       select="rdf:RDF/rss:item"/>
	 </ul>
    </body>
    ==

---+++ Enumerating the items

    ==
    rss_list_items([First_item|Rest_of_items]) -->
	html([li([\list_item_content(First_item)])]),
	rss_list_items(Rest_of_items).
    rss_list_items([]) --> [].
    ==

vs.

    ==
    <xsl:template match="rdf:RDF/rss:item">
       <li>...</li>
    </xsl:template>
    ==

---+++ Formatting the items

    ==
    list_item_content(Item) -->
	{rdf(Item,dc:description,literal(Description))},
	html([\rss_link(Item),br([]),Description]).

    rss_link(Item) -->
	{rdf(Item,rss:link,literal(Link)),
	rdf(Item,rss:title,literal(Title))},
	html(i(a(href(Link),Title))).
    ==

vs.

    ==
    ...
    <br/>
    <xsl:value-of select="./dc:description"/>

    <i>
      <a href="{./rss:link}">
      <xsl:value-of select="./rss:title"/>
      </a>
    </i>
    ==

Standing back and looking at the XSLT sheet right after writing it, it
seemed much clearer than the DCGs. A large part of this is that I'm more
accustomed to writing HTML and HTML templates with embedded code than
writing DCG templates. But I'm finding that the DCGs are more helpful
for thinking through the problem.

[JW] Also note that XSLT only converts XML data. RDF is already
getting problematic because many different XML documents result in the
same set of RDF triples and should thus produce the same output. The
Prolog version can use the results of any Prolog query and is not
limited to XML transformation.


---++ Conclusion

Since the inferences in this transformation were trivial, it doesn't
involve any particularly sophisticated Prolog, and yet this is precisely
the kind of everyday task many of us find ourselves doing all the time.
The Semantic Web, if it's to work out, will be made up as much of the
ordinary and familiar as of the exotic.

---++ Useful Links

Files used in this tutorial

    * [[The Transformation DCG (Prolog source)][dcgscript.pl]]
    * [[The XSLT Stylesheet][<xmlhack.xsl>]]
    * [[The XMLHack RSS dump][<xmlhack.rss>]]
    * [[Sample HTML output][<scriptresult.html>]]

Background documentation

    * [[DCG Rules][http://cs.union.edu/~striegnk/learn-prolog-now/html/node54.html#lecture7]] (and phrase/2)
    * [[The module system][</man/modules.html>]]

More SWI-Prolog Based RDF Infrastructure

    * [[SWI-Prolog for the (semantic) web][</web/>]]



