import time
import string
from collections import OrderedDict
from common.series import *

character_list = " " + string.punctuation + string.digits + string.ascii_uppercase + string.ascii_lowercase

def crange(start, end, modulo):
    while start < end:
        yield start
        start += 1

def encrypt_message(message, product, prod_range_from, prod_range_to):
    ########################################
    ####      Encryption Algorithm      ####
    ########################################
    
    mac = len(message)
    master_key = product
    
    #generate series count
    series_generate_count = str(master_key)[prod_range_from:prod_range_to]
    series_generate_count = int(series_generate_count.replace(series_generate_count[0:2],'10'))
    series_generate_count = series[next(x[0] for x in enumerate(series) if x[1] > series_generate_count)]

    #generate series based on message length
    slice_length = series.index(series_generate_count)
    sliced_series = series[slice_length:slice_length+mac]

    #mod series with 127 and generate series_of_prime_numbers
    series_of_prime_numbers = []

    for i in sliced_series:
        temp = i%127
        temp = temp if temp >= 32 else temp + 32
        series_of_prime_numbers.append(temp)

    #remove duplicates from series_of_prime_numbers
    seen = set()
    seen_add = seen.add
    series_of_prime_numbers = [x for x in series_of_prime_numbers[::-1] if not (x in seen or seen_add(x))][::-1]

    #generate random series
    random_series = []

    for i in series_of_prime_numbers:
        temp1 = list(crange(i,127,2**3))
        temp2 = list(crange(32,i,2**3))
        temp = temp1 + temp2
        random_series.append(temp)

    #generate key value pair of character and ascii value
    char_ascii_pair = OrderedDict()

    for i in character_list:
        char_ascii_pair[i] = ord(i)

    final_char_ascii_pair = OrderedDict(((v[0], (v[1], i)) for i, v in enumerate(char_ascii_pair.items())))

    #generate random series of message length 
    for i in range(0,mac):
        if(len(random_series) < 150):
            random_series.append((random_series[i]))

    #encryption of message
    encrypted_message = ''

    for i in range(0,mac):
        if final_char_ascii_pair[message[i]][0] == ord(message[i]):
            encrypted_message += chr(random_series[i][final_char_ascii_pair[message[i]][1]])
    
    return encrypted_message


def lambda_handler(event, context):
    message = event['message']
    product = event['product']
    prod_range_from = event['pf_from']
    prod_range_to = event['pr_to']

    return encrypt_message(message, product, prod_range_from, prod_range_to)
