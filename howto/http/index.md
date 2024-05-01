---+ How to create a web service easily?

Creating web services with SWI-Prolog is a breeze. This how-to is
intended as your first bluffer's guide.  All examples come with
fully operational source code.

    * [[Hello World][HelloText.md]]
    * [[Development support for web servers][Developing.md]]
    * [[Hello World in HTML][HelloHTML.md]]
    * [[Rule definition facilities (html//1 rules)][HTMLRules.md]]
    * [[Processing HTTP parameters][HTMLParams.md]]
    * [[How do I upload a file, preserving the filename?][FileUpload.md]]
    * [[Adding style (CSS and simple JavaScript) to your pages][HTMLStyle.md]]
    * [[Serving plain files][HTTPFile.md]]
    * [[Making your web server scalable][HTTPScale.md]]

Deploying Prolog-based web servers

    * [[Making the server accessible at port 80][Access80.txt]]
    * [[Running the server under VNC][ServerVNC.md]]
    * [[Running the server from Unix (x)inetd][ServerInetd.md]]
    * [[Running the server from Unix init][ServerInit.md]]
    * [[Running the server from Linux upstart][UpStart.md]]

This is work in progress!   If you want to contribute or comment,
send an e-mail to [[me][<mailto:jan@swi-prolog.org>]] or to the
[[mailinglist][</Mailinglist.html>]].

---++ Tutorials

[[Here][https://github.com/Anniepoo/swiplwebtut/blob/master/web.adoc]] is a tutorial with exercises by Anne Ogborn.

[[new.gif]] [[Here][https://github.com/kamahen/swipl-server-js-client]] is a sample implementation of a JavaScript client communicating with a SWI-Prolog server, using the newer ibrary(http/http_server) API.


---++ Example code

We have two servers available with complete source. One is the server
that runs http://www.swi-prolog.org, which can be downloaded through
[[GIT][</git.html>]] from the repository
[[plweb.git][</git/plweb.git>]]. The other is
[[ClioPatria][http://cliopatria.swi-prolog.org/]]. Although ClioPatria
targets semantic web (RDF) applications, it is also useful as a starting
point for general purpose web servers.

Here is a very incomplete selection of functionality that you can find
in these servers:

    * SWI-Prolog.org
	- Call CGI scripts (http_cgi.pl)
	- Autocompletion (autocomplete.pl)
	- PlDoc based wiki processing (wiki.pl, wiki_edit.pl)
	- Stress testing (directory stress)
	- Logfile handling (directory logs)
    * ClioPatria
	- User management, OpenID
	- Extension packs (CPACK)
	- Modular server configuration
	- Server statistics
	- Handle messages from Prolog
	- Lots of RDF stuff


---++ Plans (todo)

    * AJAX interaction (YUI, simple table, tree, N-Queens code?)
    * PWP
    * Logfiles and processing thereof
    * Stress-testing by replaying logfiles
