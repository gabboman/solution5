# Solution 5: A link previewer for the fediverse

As @renchap said in [this](https://gist.github.com/renchap/3ae0df45b7b4534f98a8055d91d52186) document, a solution is needed to cache link previews. This is an implementation of the 5th solution proposed in the document, hence the name, solution 5.


# Requirements

This software uses typescript and redis. instal ts-node with npm or your node package manager of choice.
Internally it will use bullmq to make sure we do the minimal number of petitions to the server.
Create a folder called cache that will be used to cache remote images.



