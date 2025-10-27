# Decrypt Quote - Substitution Cipher Game

This is a simple web application where you are challenged to decrypt substitution ciphers. You will be given random quotes to decrypt, where each letter has been replaced with a random substitute letter.

## How It Works

The application presents you with an encrypted quote where:
- Each letter of the alphabet has been randomly substituted with another letter
- You can see the encrypted text with each letter displayed in its own input field
- Your goal is to figure out the correct letter substitutions to reveal the original quote

## Features

- **Interactive Decryption**: Click on any letter input field to start decrypting
- **Keyboard Navigation**: Use arrow keys to move between letters
  - `←` / `→` - Move between letters within a word
  - `Ctrl + ←` / `Ctrl + →` - Jump between words
  - `Home` / `↑` - Jump to the first letter
  - `End` / `↓` - Jump to the last letter
- **Visual Feedback**: 
  - Selected letters are highlighted in cyan for easy tracking
  - Focused input fields have purple borders and background
  - Conflicting substitutions (same letter used twice) are highlighted in red/orange
  - Successfully solved quotes turn all letters green
- **Used Letters Tracker**: Visual indicator showing which letters you've already used and which are still available
- **Real-time Validation**: Automatic detection when you've successfully decrypted the entire quote
- **Real-time Updates**: All input fields update automatically when you make substitutions

## Technical Details

- Built with **Vue 3** and **TypeScript**
- Uses **Tailwind CSS** for styling
- Powered by **Vite** for fast development
- Package management with **Bun**
- Features a collection of inspirational quotes for decryption practice

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) package manager

### Installation

```sh
bun install
```

### Development

```sh
bun dev
```

### Production Build

```sh
bun run build
```

## Docker Deployment

The application can be easily deployed using Docker for consistent environments across different systems.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Quick Start with Docker Compose

Build and start the application

```sh
docker compose up --build
```

The application will be available at `http://localhost:3000`

### Manual Docker Build

Build the Docker image and run the container

```sh
docker build -t decrypt-quote .

docker run -p 3000:3000 decrypt-quote
```

## Quote Data Management

The application includes a Python script (`parse_quotes.py`) for fetching and managing quote data from the FavQs API.

### Features

- **Automated Quote Fetching**: Retrieves quotes from the FavQs API
- **Smart Validation**: Filters quotes based on word count (15-50 words)
- **Data Processing**: Converts API responses to the required format
- **Progress Tracking**: Shows real-time progress during fetching

### Setup

1. **Get API Token**: Sign up at [FavQs](https://favqs.com/) to get your API token
2. **Create Environment File**: Create a `.env` file in the project root:
   ```env
   FAVQS_TOKEN=your_api_token_here
   ```
3. **Install Dependencies**: The script uses `requests` and `python-dotenv`:
   ```sh
   pip install requests python-dotenv
   ```

### Usage

```sh
uv run parse_quotes.py
```

The script will:
- Fetch quotes from multiple pages of the FavQs API
- Validate each quote for appropriate length
- Save valid quotes to `src/data/quotes.json`
- Display progress information during the process

### Configuration

You can modify these constants in `parse_quotes.py`:
- `QUOTES_TO_FETCH`: Total number of quotes to collect (default: 1000)
- `QUOTE_MAX_WORDS`: Maximum words per quote (default: 50)
- `QUOTE_MIN_WORDS`: Minimum words per quote (default: 15)

## How to Play

1. **Start**: Launch the application and you'll see an encrypted quote with substituted letters
2. **Select**: Click on any letter input field to begin decrypting
3. **Type**: Enter the letter you think it should be
4. **Navigate**: Use arrow keys to move between letters quickly
5. **Track Progress**: 
   - Watch the "Used Letters" section to see which letters are still available
   - Red/orange highlights warn you about conflicting substitutions
6. **Solve**: Continue until all letters turn green - you've successfully decrypted the quote!
7. **Next Challenge**: Click "Get Next Quote" to try a new puzzle (you'll be asked to confirm)

## Tips for Decryption

- **Start with patterns**: Look for common letter patterns (like "the", "and", "or")
- **Single letters**: Pay attention to single-letter words (usually "a" or "i")
- **Letter frequency**: Consider the frequency of letters in English (e, t, a, o, i, n are most common)
- **Use the tracker**: Check the "Used Letters" section to see which letters are still available
- **Watch for conflicts**: Red/orange highlights indicate you've used the same letter twice - fix these first
- **Context clues**: Use the quote's meaning and grammar to guide your substitutions
- **Systematic approach**: Try to solve common words first, then use those letters to solve other words

Enjoy decrypting and improving your cipher-solving skills while discovering inspiring quotes and wisdom from various authors!