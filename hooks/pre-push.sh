#!/bin/bash

protected_branch='refs/heads/develop'
remote_branch=$3

echo $remote_branch
echo $protected_branch

if [ $protected_branch = "$remote_branch" ]
then
    read -p "You're about to push develop, is that what you intended? [y|n] " -n 1 -r < /dev/tty
    echo
    if echo $REPLY | grep -E '^[Yy]$' > /dev/null
    then
        exit 0 # push will execute
    fi
    exit 1 # push will not execute
else
    exit 0 # push will execute
fi

