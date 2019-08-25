## TODO

Tasks to do in no specific order

## Fixes

- The PlaceID is stored forever, which apparently can cause problems
  - The details endpoint needs to look out for the "NOT_FOUND" status, and refresh the id!

### Nice to have

- Admin endpoints
  - Check how many API calls were made to darksky
- Create service/module for getting DarkSky stats
- Add Openstreetmap as an alternative to google maps
- Add ability to pass flags to the command line
  - Like path to config, port, etc.
- Add env option for github token, so that we can use the gh api without limits

### Deploy

- Somehow have a webhook or something to trigger a new release on the webserver

### Docker

- Set the UUID/permissions correctly.
  - The data dir is created, but not accessible because it is made as root
- Limit PM2 restarts

### Internationalization

- Add an object to the cyclescore which contains all the verbs that should be used for displaying the score. That way it can be internationalized in one place
- Add a language queryparam to change verbage
