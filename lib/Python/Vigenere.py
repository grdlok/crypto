from Alphabet import *

class Vigenere:
    
    def __init__(self, key, alphabet=Alphabet("../../etc/Frequency/English.csv")):
        self.key = key
        self.alphabet = alphabet

    def encrypt(self, plaintext): 
        p_length = len(plaintext)
        k_length = len(self.key)
        ciphertext = ""
        

        if p_length > k_length:
            repetition = (p_length // k_length) + 1
            encrypt_key = self.key * repetition
            encrypt_key = encrypt_key[:p_length]
        else:
            encrypt_key = self.key[:p_length]

        for letter in zip(plaintext, encrypt_key):
            if (letter[0] in self.alphabet) and (letter[1] in self.alphabet):
                x = self.alphabet.index(letter[0])
                y = self.alphabet.index(letter[1])
                ciphertext += self.alphabet[(x+y)%len(self.alphabet)][0]
            else:
                ciphertext += letter[0]

        return ciphertext


    def decrypt(self, ciphertext):

        c_length = len(ciphertext)
        k_length = len(self.key) 
        plaintext = ""

        if c_length > k_length:
            repetition = (c_length // k_length) + 1
            decrypt_key = self.key * repetition
            decrypt_key = decrypt_key[:c_length]
        else:   
            decrypt_key = self.key[:c_length]

        for letter in zip(ciphertext, decrypt_key):
            if (letter[0] in self.alphabet) and (letter[1] in self.alphabet):
                x = self.alphabet.index(letter[0])
                y = self.alphabet.index(letter[1])
                plaintext += self.alphabet[(x-y)%len(self.alphabet)][0]
            else:
                plaintext += letter[0]

        return plaintext

