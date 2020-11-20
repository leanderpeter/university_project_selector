#!/usr/bin/python
#-*- coding: utf-8 -*-
import mysql.connector as connector
import os
from contextlib import AbstractAsyncContextManager
from abc import ABC, abstractmethod

class Mapper(AbstractAsyncContextManager, ABC):
    """Abstrakte Basisklasse für alle weiteren Mapper-Klassen"""
"""
    def __init__(self):
        self._connection = None


    def __enter__(self, ):
        pass

    def __exit__(self, ):
        pass

    @abstractmethod
    def find_all(self):
        pass

    @abstractmethod 
    def find_by_key(self):
        pass

    @abstractmethod
    def insert(self):
        pass
    
    @abstractmethod
    def update(self):
        pass
    
    @abstractmethod
    def delete(self):
        pass
"""