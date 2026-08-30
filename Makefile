.PHONY: lint check_dupes check_missing_images install

sources := $(sort $(wildcard ./exercises/**.json))

lint:
		check-jsonschema --schemafile ./schema.json $(sources)
check_dupes:
		# check for duplicate id's, if there's ID's listed here
		# we've got duplicate id's that need to be resolved
		jq -s ".[]" $(sources) | jq '.id' | sort | uniq -d
# list exercise JSON files with an empty images array
check_missing_images:
		@for f in $(sources); do \
			jq -e '.images | length == 0' "$$f" >/dev/null 2>&1 && echo "$$f"; \
		done; true
install:
		pip install check-jsonschema
dist/exercises.json: $(sources)
		# requires jq
		# brew install jq (for macos)
		jq -s '.' $^ > $@
dist/exercises.nd.json: $(sources)
		# output to new line delimited JSON
		# for use to import into PostgreSQL via the COPY command
		#
	  # https://konbert.com/blog/import-json-into-postgres-using-copy
		# https://www.postgresql.org/docs/current/sql-copy.html
		jq -s '.[]' $^ > $@
dist/exercises.csv: dist/exercises.json
		# output to csv format
		# requires in2csv which is part of
		# https://csvkit.readthedocs.io/
		in2csv ./dist/exercises.json > $@
