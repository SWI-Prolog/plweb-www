# Using SWI-Prolog commercially

As of July 2020, SWI-Prolog is managed by SWI-Prolog Solutions b.v.
as a commercial project.  The mission of SWI-Prolog Solutions b.v.  is
to help organizations using SWI-Prolog for profit.


## Why should I consider SWI-Prolog?

SWI-Prolog, a powerful declarative language, offers a high level of
abstraction similar to SQL. This abstraction allows for concise code
that can be developed quickly and maintained easily. Even domain
experts with minimal training can understand and read the code,
breaking down the traditional barrier between coders and domain
experts. As a result, development and maintenance productivity
significantly increase, allowing you to keep up with evolving business
needs effortlessly.

Unlike SQL, SWI-Prolog is a versatile language that extends beyond
accessing relational data. It excels in formal domains, enabling
reasoning about formal specifications, programming languages,
business rules, etc. Additionally, it shines in semi-formal domains like
legal reasoning, reasoning about medical guidelines or robotics.

SWI-Prolog boasts a solid and secure industry-proven core engine. It
implements most known extensions to the ISO standard core of
Prolog. The preemptive multi-threading feature efficiently utilizes
all available cores, ensuring optimal performance.

## Q&A

### Q: What about all reasons not to use Prolog? ...

#### Q: I understand Prolog is dead.  Is that true?

True, various implementations are barely alive.  SWI-Prolog however is
downloaded about 250,000 times from the [main
site](https://www.swi-prolog.org/Download.html) each year.  In
addition it is a package for several Linux distributions, it appears
on several Windows program download sites and it is a [standard Docker
library](https://hub.docker.com/_/swipl/), claiming 1M+ downloads.
We have an active user [forum](https://swi-prolog.discourse.group/)
with about 1,000 users.  The time to first response on a post rarely
exceeds an hour.  [OpenHub](https://openhub.net/p/swi-prolog) claims
nearly 1,500 commits by 25 contributers per year.

#### Q: Prolog is considered hard to learn.  Is that true?

Yes and no.  True, people with only an _imperative_ and _object
oriented_ background (C++, Java, Python, etc.), Prolog looks alien at first
sight.  People with a functional programming background are in a much
better position because pure functional languages like Lisp and
Haskell share _recursion_ as the main control structure with Prolog.
People with a mathematical background understand Prolog easily as it
connects directly to _inductive proof_.  In our experience people with
no programming background at all deal surprisingly well with Prolog.
Consider the (toy) example below.  A Python programmer barely
recognises this as a program, while a logician but also someone
without programming experience immediately recognises this as a
correct formalization of the concepts _sister_ and _sibling_.

```
sister(Sister, Sibling) :-
	sibling(Sister, Sibling),
	female(Sister).

sibling(Person1, Person2) :-
    parent(Person1, Parent),
	parent(Person2, Parent).
```

For programmers in the first category, count some weeks before they
connect the dots.

#### Q: Prolog does not scale.  Is that true?

Briefly, Prolog scales well for what it is designed for and can
seamlessly use other technology for things it is not designed for.
Below are some details.

Prolog is not good at some tasks.  Notably tasks that involve
operations on large arrays (vectors) of uniform numbers such as
images.   That actually also applies to e.g., Python and is which
why most of the Python machine learning libraries are coded in C
or C++, with or without the help of the GPU (using CUDA).

Next, there are tasks for which the naive declarative specification
does not scale due to a combinatorial explosion.  Such cases are easy
to predict because the execution model of Prolog (called SLD
resolution) is easy to understand.  There are generally three ways
out: _Constraint Logic Programming_, _Tabled (SLG) resolution_ or
reformulate the specification such that it implements a more efficient
algorithm.  For example, we can specify _sorting_ as (1) _generate a
permutation_ and (2) _check the list is ordered_.  We can also specify
it as (1) _split the list in two_, (2) _sort the two smaller lists_
and (3) _merge the two ordered lists_.  This recursive specification
stops by stating that the sorted version of a list with no or one
element is the list itself.  Both work, but where the complexity of
the first is O(n!), the complexity of the second is O(log(n)).  In
other words, while the specification _describes_ the logical relation
declaratively, the transparent and predictable resolution causes the
same description to _implicitly encode an algorithm_.

SWI-Prolog does scales to tens of millions of facts and automatically
builds _indexes_ to access large datasets efficiently.  The indexes
are build _just in time_ based on the actual runtime behavior of your
code.  If that is not enough, you can connect it seamlessly to
external data sources such as relational databases, graph stores, etc.
For example, an SQL query can easily be wrapped as a predicate, after
which it behaves exactly the same as a normal Prolog predicate.
Prolog does not suffer from the Object–relational _impedance mismatch_
because Prolog itself is _relational_.  Similarly, large arrays may be
handled through the C, C++, C#, Java, Rust or Python interface, after
which the result (again) fits naturally in Prolog's eco system.

#### Q: Where do I find Prolog programmers?

It is unfortunately true than experienced Prolog programmers are not
readily available everywhere.  They do exist.  Many work as
contractors.   Luckily, world-wide cooperation currently works
well.

### Q: Is SWI-Prolog a prototyping language?

Yes and no.  Prolog is good at prototyping because the brevity of the
code allows for exploring ideas quickly.  Prolog is also mature enough
to bring your prototype to the next level and use the demonstrator to
convince your customers or investors.  Many companies also proofed it
to be suitable for running production software.  Note that the
abstract and concise code that can be read and written by domain
experts make this notably viable in domains where the rules change
often.

For programming in the large we have _modules_ to encapsulate the
code as well as support for _testing_, _documentation_, _static
analysis_, _coverage analysis_, _profiling_, etc.

Still, companies may at some point decide that it is better to rewrite
(part of) the application in another language.  Efficiency, experience
of employees or uniformity of the technology stack may drive this
decision.  SWI-Prolog allowed you to convince customers and investors
and bring the system to the market early as well as to fully grasp the
desired functionality and required algorithms.  Rewriting is now much
easier.  Note that the good integration between SWI-Prolog and many
other languages allows for migrating gradually.

### Q: How is SWI-Prolog integrated in our IT infrastructure?

There are roughly two ways.  One option is to connect SWI-Prolog
through some standard protocol.  Readily available is to use HTTP
(including WebSockets), STOMP (connects to e.g, RabbitMQ), Redis and
ROS2 (Robotics Operating System).  SWI-Prolog can read and write XML,
JSON, YAML, Google's protocol buffers (protobuf), RDF (ntriples,
Turtle, RDF/XML).  Contact us if you need support for another
protocol.

Alternatively, SWI-Prolog can be embedded in a program written in some
other language or use components written in another language.  We
provide these features for a large range of languages, e.g., C, C++,
Java, Rust, JavaScript and Python.  C, C++ and Rust allow for fast
interfaces that support preemptive multi-threading.  Notably Python
provides easy access from Prolog to many libraries and APIs.  Notably
scalability when using Prolog threads may be limited.  Still, Python
provides an excellent entry point to many resources while a better
scalable interface may be realized after evaluation with a Python
based prototype.

### Q: What are the deployment options?

SWI-Prolog applications may be deployed in many different ways.  _In
house_ deployment may focus on easy debugging and updates.  End user
products may prefer a single file executable without dependencies that
make it hard for the end user to extract details about the algorithms
used.

A SWI-Prolog process consists of the runtime system that is by default
packaged as a shared object (DLL) and the Prolog code.  The Prolog
code can be distributed as _source_ or _virtual machine code_ (similar
to e.g., Java ``.class`` and ``.jar`` files).  The _virtual machine code_
may just be for your application or represent the entire program.  The
first is called a _quick load file_ and the second a _saved state_.  A
_state_ can be distributed as a file or embedded in a shared object or
executable.  Code may be _obfuscated_, which implies that internal
identifiers are replaced by generated constants and debug information
such as source code locations are not included.  Finally, it is
possible to add arbitrary (data) files to the _state_.  Depending on
the OS, it is possible to distribute arbitrary complex applications as
a single file, possibly statically linked, executable.

### Q: What about the security of my SWI-Prolog application?

Security is now a big issue.  Being a niche language, there are few
tools available to access the security of Prolog programs.  Written in
C, the security of SWI-Prolog itself has gone through auditing
processes several times.  A couple of issues have been fixed as a
result of this.  Given a secure Prolog implementation, security of
applications written in this Prolog comes cheap.  Prolog memory
handling is safe, so _buffer overflows_ are not possible.  _Injection
attacks_ are possible.  The design of relevant libraries as well as
the support for _quasi quotations_ avoid the need for managing data
that satisfies some formal syntax as text (using strings).  Almost all
manipulation or generation of such data is performed by parsing and
manipulating the AST or generating the AST from scratch followed by
generating the text from the AST.  A noteworthy example is the
framework for generating HTML which makes it impossible to generate
invalid HTML.  Eventually we had to add an escape mechanism to inserts
text literally because customers had client software that insisted on
specific, invalid, HTML content.


### Q: What does SWI-Prolog has to offer for maintenance and debugging?

  - A graphical source level debugger
  - Dynamically configurable debug log messages and _assertions_
  - Profiling and coverage analysis
  - Unit testing.  Tests may be run in parallel.
  - A built-in Emacs clone, the [sweep mode](https://eshelyaron.com/sweep.html)
    for GNU Emacs and several externally available modes for vscode,
	Eclipse and more.
  - Reliable hot swap of code, even on active multi-threaded server
    processes.  This allows for adding debug log statements without
	down time as well as hot fixing of issues without down time.
  - _Secure login_ to Prolog processes using SSH.   This allows for
    inspecting the state of services or embedded Prolog instances
	as well as interactive testing and using the hot swap facilities
	to investigate and fix bugs.

### Q: How portable is SWI-Prolog?

SWI-Prolog is written in C, following the C11 standard.  It may be
compiled using gcc, clang or Microsoft Visual C++ (MSVC).  It does not
use any assembly code.  It does use gcc and clang _built-in
functions_, notably for lock-free thread synchronization using the
_atomic_ built-ins and for fast overflow-aware arithmetic.  On MSVC it
uses the _intrinsics_ functions where applicable.

The build is configured and controlled using
[CMake](https://cmake.org/).  This facilitates automatic configuration
for a wide range of platforms as well as using multiple build backends
such as Unix `make`, `ninja` or Microsoft Visual C++ project files.
CMake also facilitates embedding a SWI-Prolog in larger projects, where
needed using a project specific configuration.

SWI-Prolog supports both 32 and 64 bit architectures on a wide range
of CPUs.  All CPUs supported by [Debian
Linux](https://www.debian.org/releases/stable/i386/ch02s01.en.html)
are supported. Low level OS access is provided for POSIX based systems
(Linux, *BSD (including MacOS) and Windows.  Finally, there is a
[WASM](https://webassembly.org/) based version that can run in your
browser or under Node.js.  It is available as [npm
package](https://www.npmjs.com/package/swipl-wasm).

Practically all features are transparently supported on all supported
platforms.  For all platforms SWI-Prolog comes with small extensions
to access functionality that is platform specific and cannot be
generalized.  Examples are accessing the Windows registry in the
Windows port or accessing the browser DOM in the WASM version.

### Q: What dependencies does SWI-Prolog have?

The __core__ depends on [zlib](https://zlib.net/) and optionally on
[GMP](https://gmplib.org/).  Without GMP it provides the same
functionality (unbounded integers, rational numbers and good random
numbers) based on an included port of
[LibBF](https://bellard.org/libbf/)

The __extension packages__ come in three tastes.  Part of the packages
are pure Prolog, part use C11 code without dependencies and notably
the _interface_ packages such as for ODBC, OpenSSL, Java and Python
depend on the development environment of these systems.  All these
extensions are _optional_ though.


### Q: Licenses, open source ...

#### Q: What are the license conditions for SWI-Prolog?

SWI-Prolog is distributed under the permissive BSD-2 license.  All
software that is part of the standard distribution is either covered
by this license, concerns external code covered by one of the other
permissive licenses (BSD-3, MIT, Apache-2) or is optional.  Optional
components covered by GNU licenses are

 - The GPL licensed [readline](https://tiswww.case.edu/php/chet/readline/rltop.html)
   Command line editor.  This interface may be loaded on demand
   to provide a better interactive experience.   The default is
   to use the BSD [libedit](https://www.thrysoee.dk/editline/)
   Finished applications rarely need either.
 - The LGPL licensed [GMP](https://gmplib.org/) library provides
   unbounded integers and rational number support.  This is the
   default.  Alternatively we provide equivalent functionality
   by means of [LibBF](https://bellard.org/libbf/) under the MIT
   license.   The LibBF version is smaller but slower.

#### Q: Why is SWI-Prolog open source?

SWI-Prolog is further developed and maintained by SWI-Prolog Solutions
b.v. under the permissive open source BSD-2 license terms.  We
strongly believe that open source is the best model for infrastructure
such as SWI-Prolog because

  1. Open source allows users to assemble their own configuration on their
     own environment.  Users have been the driving force for many
	 of the available ports.
  2. Open source simplifies debugging, notably when embedding Prolog
     or using foreign language extensions.
  3. Open source allows for ports, fixes and changes without having
     to rely on a vendor.  Depending businesses can hire anyone to
	 solve their problem or acquire the expertise to do so in house.
  4. More eyes find more bugs.  This has been said many times.  In
     our experience it is true, but it requires a long time to
	 establish a community with enough expertise to make it true.
	 SWI-Prolog has that community.
  5. Open source simplifies growing the user community.  A large
     user community makes it easier to find programmers and get
	 answers to your problems.
  6. Open sources comes with much lower cost for sales and
     distribution.
  7. Open source provides direct communication between users and
     developers.  You can share your problems and the
	 community can come up with suggestions or ways to resolve
	 your problems.


#### Q: What about vendor lock-in?

The core of Prolog is standardized by ISO/IEC 13211-1:1995.
SWI-Prolog deviates from this standard on several points, notably
preferring integer and rational number arithmetic over using floating
point numbers, provide support for Unicode programs and reinterpret
some syntactic constructs to allow for _dicts_ as primary citizens.
Programs that avoid some edge cases run unmodified on a large number
of Prolog implementations.

Although the Prolog standard for modules was never adopted, a good
number of implementations support the module system introduced by
Quintus Prolog.  While most systems extended this module system,
basic usage suffices for many applications and is portable.

Several extensions are widely adopted, notably _unbounded integer
support_, _constraints_ (_attributed variables_) and _tabling_.

In addition to this, SWI-Prolog has several fairly unique extensions.
Examples are mature multi-threading support, _delimited
continuations_, _engines_, (database) _transactions_, _rational
numbers_, _string_ and _dict_ data types.  Availability of the sources
under the BSD-2 license and a large and active community is your
warrant here.  The resources required to maintain SWI-Prolog or port
required features to another target system should be manageable for
most commercial users.

In general, porting to another implementation that satisfies the
requirements of your application is non-trivial but requires only a
tiny amount of resources compared to the initial development.  The
permissive license of SWI-Prolog allows porting libraries rather than
reimplementing them if they do not exist on the target platform.


## What does SWI-Prolog Solutions b.v. offer?

### O: Access whether SWI-Prolog is suitable for your problem

Can SWI-Prolog  solve your problem?  How  can it do so?   What are the
risks involved?  Does it scale?  How do we interface with our existing
infrastructure?  (Where) can we find programmers?

We are happy to discuss your case.  For several customers we developed
a _proof of concept_ (POC).


### O: Help with design and implementation

Our involvement  may continue by  providing support in the  design and
implementing the complicated modules of the design.  A common split of
responsibilities is  for you to  provide the domain  knowledge (rules)
and for SWI-Prolog Solutions b.v. to  provide the tooling to make them
work.  Your  business remains  in control  while outsourcing  the hard
work.

### O: Provide education and training

SWI-Prolog is a rich environment.   While basic Prolog is well covered
in many  books, there is little  public information on how  one should
use  Prolog  in professional  environments.   We  offer training  that
addresses your specific problems, including code reviews.

### O: If needed, extend or improve SWI-Prolog

The most  common improvement  we supply  are interfaces  to languages,
protocols, data  formats, etc.   We also provide  tooling such  as for
additional static analysis, documentation and testing.  We can provide
language extensions,  improved performance, better deployment  if your
product needs this.

### O: Provide support for SWI-Prolog

At this moment we do not provide support contracts you can simply
subscribe too.  From the [Discourse
forum](https://swi-prolog.discourse.group/) and [GitHub
issues](https://github.com/SWI-Prolog/swipl-devel/issues) you will
learn that problems are typically addressed quickly.  We are happy to
discuss a support contract with you to address your specific needs.

### Q: Where do I contact SWI-Prolog Solutions b.v?

Please send an email to
[solutions@swi-prolog.com](<mailto:solutions@swi-prolog.com>)

### Q: How is SWI-Prolog Solutions b.v. organized?

SWI-Prolog Solutions b.v. is a company registered in the Netherlands
with the Chamber of commerce (KvK) number 80154573.  A "b.v." is a
Dutch _private limited company_.


## SWI-Prolog Solutions b.v. seeks cooperation with big companies and big projects

SWI-Prolog solutions b.v. is interested in cooperation in big projects
that can spin enough resources to speed up development or provide long
term  guaranteed sustainable  development and  maintenance.  We  offer
close cooperation with developers, priority  for your needs in further
system  development  and  training.   People  cooperating  in  such  a
cooperation may be employed by SWI-Prolog Solutions b.v., but can also
be employees of  your business or work as contractors.   Our aim is to
enlarge  the  group  of  people that  are  dedicated  to  SWI-Prolog's
development.  Your benefit is access to sustainable high valued Prolog
implementation with the flexibility offered by in-house development at
lower cost and with higher impact.
