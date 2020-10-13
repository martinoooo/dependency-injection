build:
	yarn run test
	rm -rf dist
	tsc
	cp README.md dist/