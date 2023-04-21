require "json"

# enumerate through all the JSON files in the exercises directory recursively
Dir.glob("./exercises/**/*.json") do |file|
  # read the JSON file
  json = JSON.parse(File.read(file))

  # puts json['id']

  json['images'] = json['images'].map do |image|
    File.join(json['id'], File.basename(image))
  end

  # puts crap.inspect

  # id_filename = json["id"] + ".json"
  # puts "#{id_filename} = #{File.basename(file)}"

#   if id_filename != File.basename(file)
#     puts file
    # target_file = File.dirname(file) + "/" + id_filename

    # source_dir = file.chomp(".json")
    # target_dir = File.dirname(file) + "/" + json["id"]

    # puts "#{file} -> #{target_file}"

    # File.rename(file, target_file)
    # puts "#{source_dir} -> #{target_dir}"
    # File.rename(source_dir, target_dir)
  # end

  # a new key to the JSON file called id that is derived from the filename without the extension
  # json["id"] = File.basename(file, ".json")

  # puts json.inspect
  # write the JSON file
  File.write(file, JSON.pretty_generate(json))

  # puts file

  # break
  # regex to match a word with no spaces
end
