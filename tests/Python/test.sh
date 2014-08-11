#!/usr/bin/env bash
cd `dirname $0`
echo '**************Test Caesar*****************'
PYTHONPATH=../../lib/Python/:../../etc/Alphabet/Python/ python2.7 CaesarTest.py
echo '**************Test Caesar*****************'
echo '**************Test Vigenere***************'
PYTHONPATH=../../lib/Python/:../../etc/Alphabet/Python/ python2.7 VigenereTest.py
echo '**************Test Vigenere***************'

