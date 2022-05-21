run_import:
	python3 ./lib/main.py

install_dependencies:
	python3 -m pip install -r requirements.txt && npm i

start_server_dev:
	APP_ENV=dev node server.mjs

start_server_deploy:
	APP_ENV=deploy node server.mjs

deploy:
	npm run clean && APP_ENV=deploy npm run build && npm run export-static && aws s3 cp out s3://greatestgamesofalltime --recursive

clean:
	rm -rf out; rm -rf .next