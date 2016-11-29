#!/bin/env bash

if [ $# -lt 1 ] ; then
	echo "Usage: $0 new-project-dir"
	exit;
fi

if [ -d "$1" ] && [ "$2" != "--force" ] ; then
	echo "$1 exists.. bye.";
	exit;
fi


rsync -a --info=progress2 base-project-final/ "$1/"
