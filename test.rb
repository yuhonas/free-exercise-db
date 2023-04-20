require "json"

# enumerate through all the JSON files in the exercises directory recursively
Dir.glob("./exercises/**/*.json") do |file|
  # read the JSON file
  json = JSON.parse(File.read(file))

  # puts json['id']

  id_filename = json["id"] + ".json"
  # puts "#{id_filename} = #{File.basename(file)}"

  if id_filename != File.basename(file)
    # puts "#{file} -> #{id_filename}"
    File.rename(file, File.dirname(file) + "/" + id_filename)
  end

  # a new key to the JSON file called id that is derived from the filename without the extension
  # json["id"] = File.basename(file, ".json")

  # puts json.inspect
  # write the JSON file
  # File.write(file, JSON.pretty_generate(json))

  # puts file

  # break
  # regex to match a word with no spaces
end
