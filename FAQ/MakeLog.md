# Make a log of the session?

Often you wish to make a transcript of the interaction. On Unix you can
fallback to the `script` utility. You can also copy/paste from the window
(see also WinCopy.md). All platforms however support the predicates
protocol/1 and noprotocol/0 to log the console interaction to a file.

```
?- protocol('mylog.txt').
true.
```

... play around ...


```
?- noprotocol.
true.
```
