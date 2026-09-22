# Privacy policy

This policy describes what happens to your data when you visit
``www.swi-prolog.org``, when you sign in to the site, and when your
SWI-Prolog installation contacts the site to install a pack.

It was last updated on September 22, 2026.

## Who is responsible

The website is operated by SWI-Prolog Solutions b.v. on behalf of the
SWI-Prolog project. Questions about this policy or about data we hold
about you can be sent to ``jan@swi-prolog.org``. See also [[Contact][Contact.md]].

## The short version

We run this site to distribute SWI-Prolog and its documentation, not to
learn about you.

  - There is no advertising, no tracking, no analytics and no profiling.
    We do not embed Google Analytics or any comparable service, and we
    do not sell, rent or trade any data.
  - If you only read the site, we do not ask for your name, your e-mail
    address or anything else, and we set no cookies.
  - If you sign in, we store your name and e-mail address, because the
    site cannot attribute your contributions or notify you without
    them. Your e-mail address is never shown to other users.

The rest of this page describes the details.

## When you just read the site

Our web server keeps a log of the requests it receives. Each entry
holds the time, the requested address, the response, and the
information your browser sends with a request: your IP address, the
`User-Agent` string and similar headers. We use this only to operate
the server, to diagnose failures and to recognise abuse such as denial
of service attempts. The logs are rotated monthly and older logs are
discarded, so an entry is normally kept for at most six months.

No cookies are set for anonymous visitors, and none of the pages
contain third party trackers.

The site is served through a content delivery network (Fastly), which
necessarily sees the requests it forwards and applies its own logging
for the same operational purposes.

## When you sign in with Google

Signing in is entirely optional. It is needed only to edit wiki pages,
post comments and news, tag pages, register a pack or write a pack
review.

We ask Google for the `openid`, `email` and `profile` scopes. From the
answer we store:

  - The identifier Google uses for your account. It tells us that a
    returning visitor is the same person; it is meaningless elsewhere.
  - Your name and your e-mail address.

On first sign-in you are asked to complete a profile, where you may
correct the name, and optionally add a home page address and a short
self description. We ask for no other personal data. We do not receive
and do not want your Google password, your contacts, your calendar or
your documents, and we never act on your behalf at Google.

The profile form is protected by Google reCAPTCHA, which is subject to
Google's own privacy policy.

### What is public and what is not

  - **Public**: your name, and the home page and description you chose
    to add, together with the contributions you make — wiki edits,
    comments, news items, tags, pack registrations and reviews. This is
    the point of signing in: contributions are attributed to a person.
  - **Not public**: your e-mail address and your Google account
    identifier. These are visible only to you on your own profile page
    and to the site administrators.

Edits to wiki pages are committed to a public git repository. The
commit records the name you chose, not your e-mail address.

### What we use your e-mail address for

Only to send you notifications about pages, packs and discussions you
chose to watch, and, rarely, to contact you about something you posted.
We do not send newsletters or marketing of any kind, and we do not
disclose the address to other users or to third parties.

## Installing packs

When SWI-Prolog installs or updates a pack, it queries this site for the
available versions. As with any other request, the query and the IP
address it came from appear in the server log described above. We use
this to see which packs are being used and to find broken packs. We do
not build profiles of individual users or machines from it.

## Your rights

You can view and change the data in your profile at any time from your
profile page while signed in. Write to ``jan@swi-prolog.org`` if you want
to see what we hold about you, correct it, or have your account and its
personal data removed. Note that contributions you have already made to
the wiki and the forums remain part of the public record, as they are
part of the site's content and its git history.

## Changes to this policy

If this policy changes, the new version appears on this page with an
updated date.
