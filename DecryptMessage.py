import string
from collections import OrderedDict
from common.prime import series
import urllib


character_list = " " + string.punctuation + string.digits + string.ascii_uppercase + string.ascii_lowercase

def crange(start, end, modulo):
    while start < end:
        yield start
        start += 1

def decrypt_message(message, product):
    ########################################
    ####      Decryption Algorithm      ####
    ########################################
    try:
        mac = len(message)
        master_key = product

        #generate series count
        series_generate_count = series[next(x[0] for x in enumerate(series) if x[1] > master_key)]

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

        #decryption of message
        decrypted_message = ''

        for i in range(0,mac):
            if final_char_ascii_pair[message[i]][0] == ord(message[i]):
                temp = random_series[i].index(ord(message[i]))
                for key, val in final_char_ascii_pair.iteritems():
                    if val[1] == temp:
                        decrypted_message += key

        return {"result" : decrypted_message}
    except Exception as err:
        return {"result" : str(err)}


def lambda_handler(event, context):
    message = urllib.unquote(event['message'])
    product = event['product']
    return decrypt_message(message, product)
