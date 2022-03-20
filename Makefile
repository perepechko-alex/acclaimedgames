run_import:
	python3 ./lib/main.py

start_server:
	node server.mjs

clean:
	rm -rf out; rm -rf .next