run_import:
	python3 ./lib/main.py

start_server_dev:
	APP_ENV=dev node server.mjs

start_server_deploy:
	APP_ENV=deploy node server.mjs

deploy:
	npm run clean && APP_ENV=deploy npm run build && npm run export-static && aws s3 cp out s3://greatestgamesofalltime --recursive

clean:
	rm -rf out; rm -rf .next