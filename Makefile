.PHONY: lint check_dupes install
lint:
		check-jsonschema --schemafile ./schema.json ./exercises/**.json
check_dupes:
		# check for duplicate id's, if there's ID's listed here
		# we've got duplicate id's that need to be resolved
		jq -s ".[]" exercises/**.json | jq '.id' | sort | uniq -d
install:
		pip install check-jsonschema
dist/exercises.json: ./exercises/**.json
		# requires jq
		# brew install jq (for macos)
		jq -s '.' ./exercises/**.json > ./dist/exercises.json
dist/exercises.nd.json: ./exercises/**.json
		# output to new line delimited JSON
		# for use to import into PostgreSQL via the COPY command
		#
	  # https://konbert.com/blog/import-json-into-postgres-using-copy
		# https://www.postgresql.org/docs/current/sql-copy.html
		jq -s '.[]' ./exercises/**.json > ./dist/exercises.nd.json
dist/exercises.csv: dist/exercises.json
		# output to csv format
		# requires in2csv which is part of
		# https://csvkit.readthedocs.io/
		in2csv ./dist/exercises.json > ./dist/exercises.csv
