from Vigenere import *
import unittest

class TestVigenere(unittest.TestCase):
    

    def test_sanity(self):
        v = Vigenere("lemon")
        self.assertTrue(v.encrypt("attackatdawn")=="lxfopvefrnhr")
        self.assertTrue(v.decrypt("lxfopvefrnhr")=="attackatdawn")

if __name__=="__main__":
    unittest.main()
