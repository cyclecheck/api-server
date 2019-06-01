## TODO

Tasks to do in no specific order

- Add an auth layer for admin specific endpoints
- Admin endpoints
  - Clear places database
  - Check how many API calls were made to darksky
  - clear cache
- Create service/module for getting DarkSky stats
- ~~Add caching to weather and location routes~~
- ~~Calculate the cycle score~~
- ~~Add optional param to the `check` endpoint for formatting the units in the response~~
- Add ability to add `day`/`night` to the Display icons

### Deploy

- Create a dockerfile for it
- Somehow have a webhook or something to trigger a new release on the webserver
