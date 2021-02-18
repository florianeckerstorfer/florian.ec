#!/bin/bash

currentDate=`date +"%Y-%m-%d"`
newDir="src/blog/$currentDate-$1"
newFile="$newDir/index.md"
mkdir -p $newDir
echo "---" > $newFile
echo "permalink: $1" >> $newFile
echo "title: " >> $newFile
echo "date: $currentDate" >> $newFile
echo "category: " >> $newFile
echo "tags: " >> $newFile
echo "description: " >> $newFile
echo "---" >> $newFile
