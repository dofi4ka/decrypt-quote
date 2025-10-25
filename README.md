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
  - Same letters are highlighted in cyan
  - Focused input field is highlighted in purple
  - Conflicting substitutions are highlighted in red
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

1. Start the application and you'll see an encrypted quote
2. Click on any letter input field to begin decrypting
3. Type the letter you think it should be
4. Use arrow keys to navigate between letters
5. Continue until you've decrypted the entire quote
6. Click "Get Next Quote" to try a new challenge

## Tips for Decryption

- Look for common letter patterns (like "the", "and", "or")
- Pay attention to single-letter words (usually "a" or "i")
- Consider the frequency of letters in English
- Use context clues from the quote's meaning

Enjoy decrypting and improving your cipher-solving skills while discovering inspiring quotes and wisdom from various authors!