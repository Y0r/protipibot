
# Installation

1) Build container 'docker build -t bot .'
2) Run 'docker compose up'

### Mongo debug:

1) Run 'docker compose exec mongo_db sh' to open container CLi.
2) Run 'mongosh' to start session (?).

Then you can use different commands:
 - show collections
 - show tables
 - db.logs.find()

_logs - table name to display._

## Texting

Since telegram supports html or markdown modes we can use different approaches. 
BTW, I prefer markdown due to compact syntax. if you want to use HTML instead change getDefaultMessageParameters().
Change the 'parse_mode' to 'HTML' formatting type. 

A few simple rules for editing texting YML file:

1) Always use double quotes (Otherwise \n may not work).
2) Escape following characters (.-_*), add \ character before.
3) You can find allowed formatting on this page https://core.telegram.org/bots/api#formatting-options


## Services

There a bunch of sub-services to simplify code base.

### Logger

Used to log every single message from user. Can be turned off via configuration file.
Take a look on /config/logger.yml to specify logger configurations.

### ImagesManager

Integrates third-party service Cat API and return random cat photo.
API credentials stored in .env file.

# Coding Standards

Just install and configure prettier in JetBrains IDE. That's it.