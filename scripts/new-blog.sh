#!/bin/bash

read -p "Title: " title
read -p "Slug: " slug
read -p "Category: " category
read -p "Tags: " tags
read -p "Description: " description

currentDate=`date +"%Y-%m-%d"`
newDir="site/blog/$currentDate-$slug"
newFile="$newDir/index.md"
mkdir -p $newDir
echo "---" > $newFile
echo "permalink: blog/$slug/" >> $newFile
echo "title: $title" >> $newFile
echo "date: $currentDate" >> $newFile
echo "category: $category" >> $newFile
echo "tags: [$tags]" >> $newFile
echo "description: $description" >> $newFile
echo "---" >> $newFile

echo $newFile

