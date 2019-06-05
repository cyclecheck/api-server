# 1.0.0 (2019-06-05)


### Bug Fixes

* **config:** fix the loading of the config module ([4ad4cc3](https://github.com/cyclecheck/api-server/commit/4ad4cc3))
* **environment:** fix the parsing of environment ([0f20cb1](https://github.com/cyclecheck/api-server/commit/0f20cb1))
* **linter:** fix linter removing null force ([42d1d1e](https://github.com/cyclecheck/api-server/commit/42d1d1e))
* **weather:** tweak the score calculating ([3f15666](https://github.com/cyclecheck/api-server/commit/3f15666))


### Build System

* **packaging:** create a docker package and a node package.  Move dockerfile into own repo. ([b019005](https://github.com/cyclecheck/api-server/commit/b019005))


### Features

* **admin:** add admin routes locked behind an auth strategy ([8f840a3](https://github.com/cyclecheck/api-server/commit/8f840a3))
* **auth:** add guard and decorator for auth ([52d5147](https://github.com/cyclecheck/api-server/commit/52d5147))
* **caching:** add caching to the weather endpoints ([39e4933](https://github.com/cyclecheck/api-server/commit/39e4933))
* **config:** add env parsing ([2823c90](https://github.com/cyclecheck/api-server/commit/2823c90))
* **cyclescore:** calculate the cyclescore and format the units ([b14393c](https://github.com/cyclecheck/api-server/commit/b14393c))
* **darksky:** add api wrapper for darksky ([c8728d2](https://github.com/cyclecheck/api-server/commit/c8728d2))
* **database:** add a database ([a2bba97](https://github.com/cyclecheck/api-server/commit/a2bba97))
* **location:** add autocomplete and place details ([d037821](https://github.com/cyclecheck/api-server/commit/d037821))
* **location:** add location decoding using google maps ([5eb0b9f](https://github.com/cyclecheck/api-server/commit/5eb0b9f))
* **weather:** add fetching and parsing of weather ([3fafa44](https://github.com/cyclecheck/api-server/commit/3fafa44))


### BREAKING CHANGES

* **packaging:** Dockerfile is now in a different repo
