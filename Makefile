.PHONY: lint install
lint:
		check-jsonschema --schemafile ./schema.json ./exercises/**.json
install:
		pip install check-jsonschema
dist/exercises.json: ./exercises/**.json
		jq -s '.' ./exercises/**.json > ./dist/exercises.json
dist/exercises.nd.json: ./exercises/**.json
		# output to new line delimited JSON
		# for use to import into PostgreSQL via the COPY command
		#
	  # https://konbert.com/blog/import-json-into-postgres-using-copy
		# https://www.postgresql.org/docs/current/sql-copy.html
		jq -s '.[]' ./exercises/**.json > ./dist/exercises.nd.json

