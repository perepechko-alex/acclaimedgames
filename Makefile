run_import:
	python ./lib/main.py

start_server:
	node server.mjs

build:
	next build

export-static:
	next export

clean:
	rm -rf out; rm -rf .next

deploy:
	clean; build; export-static;