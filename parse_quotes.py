# /// script
# dependencies = [
#   "requests",
#   "python-dotenv",
# ]
# ///

import os
import requests
from dotenv import load_dotenv
from dataclasses import dataclass
import json

load_dotenv()

FAVQS_TOKEN = os.getenv('FAVQS_TOKEN')
FAVQS_URL = 'https://favqs.com/api/quotes'
FAVQS_HEADERS = {
    'Authorization': f'Token token={FAVQS_TOKEN}'
}

QUOTES_FILE = 'src/data/quotes.json'
QUOTE_MAX_WORDS = 50
QUOTE_MIN_WORDS = 15

QUOTES_TO_FETCH = 1000

@dataclass
class Quote:
    id: str
    text: str
    author: str
    
    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'author': self.author
        }

def fetch_quotes(page: int = 1):
    url = FAVQS_URL
    headers = FAVQS_HEADERS
    params = {
        'page': page,
    }
    response = requests.get(url, headers=headers, params=params)
    if response.ok:
        return response.json()['quotes']
    else:
        raise Exception(f"Failed to get quotes: {response.status_code} {response.text}")


def parse_quotes(quotes: list[dict]):
    for quote in quotes:
        try:
            yield Quote(quote['id'], quote['body'], quote['author'])
        except Exception as e:
            continue


def validate_quote(quote: Quote):
    words = quote.text.split()
    if len(words) > QUOTE_MAX_WORDS:
        return False
    if len(words) < QUOTE_MIN_WORDS:
        return False
    return True


if __name__ == '__main__':
    quotes = []
    page = 1

    while len(quotes) < QUOTES_TO_FETCH:
        fetched_quotes = fetch_quotes(page)
        parsed_quotes = list[Quote](parse_quotes(fetched_quotes))
        valid_quotes = [quote for quote in parsed_quotes if validate_quote(quote)]
        print(f"Page {page:>3}: Fetched {len(valid_quotes):>3}/{len(parsed_quotes):>3} valid quotes. {len(quotes):>3}/{QUOTES_TO_FETCH:>3} total quotes. ({len(quotes) / QUOTES_TO_FETCH * 100:.2f}%)")
        quotes.extend(valid_quotes)
        page += 1

    print(f"Saving {len(quotes)} quotes to {QUOTES_FILE}")
    os.makedirs(os.path.dirname(QUOTES_FILE), exist_ok=True)
    with open(QUOTES_FILE, 'w') as f:
        json.dump([quote.to_dict() for quote in quotes], f, indent=2)