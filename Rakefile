require "rubygems"
require 'rake'
require 'yaml'
require 'time'
require 'fileutils'

SOURCE = "."
CONFIG = {
  'version' => "0.2.13",
  'posts' => File.join(SOURCE, "_posts"),
  'images' => File.join(SOURCE, "images"),
  'images_templates' => File.join(SOURCE, "_images_templates"),
  'post_ext' => "markdown",
  'editor' => 'gvim'
}

# Path configuration helper
module JB
  class Path
    SOURCE = "."
    Paths = {
      :posts => "_posts"
    }
    def self.base
      SOURCE
    end

    # build a path relative to configured path settings.
    def self.build(path, opts = {})
      opts[:root] ||= SOURCE
      path = "#{opts[:root]}/#{Paths[path.to_sym]}/#{opts[:node]}".split("/")
      path.compact!
      File.__send__ :join, path
    end
  end #Path
end #JB

# Usage: rake post title="A Title" [date="2012-02-09"]
desc "Begin a new post in #{CONFIG['posts']} [layout=(long|short|medium)][lang=(en|nl)][date=YYYY-mm-dd][title=TITLE]"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])

  layout = ENV['layout'] || 'medium'
  lang = ENV['lang'] || 'en'

  title = ENV["title"] || "new-post"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    now = (ENV['date'] ? Time.parse(ENV['date']) : Time.now)
    date = now.strftime('%Y-%m-%d')
  rescue Exception => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['posts'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post_#{layout}"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts "tags: []"
    post.puts "lang: #{lang}"
    post.puts "---"
    post.puts "{% include JB/setup %}"
  end

  # Map layouts to image_layouts
  image_layout = case layout
    when "long" then "landscape"
    when "short" then "portrait"
    when "medium" then "panorama"
  end

  imagefile = File.join(CONFIG['images'], now.year.to_s, "%02d" % now.month, "%02d" % now.day, "#{slug}.png");
  if File.exists?(imagefile)
    abort("rake aborted!") if ask("#{imagefile} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  template_imagefile = next_image! image_layout
  puts "Copying image: #{template_imagefile} to #{imagefile}"
  mkdir_p File.dirname(imagefile)
  FileUtils.copy(template_imagefile, imagefile)

  system "#{CONFIG['editor']} #{filename}"
end # task :post

# Usage: rake page name="about.html"
# You can also specify a sub-directory path.
# If you don't specify a file extention we create an index.html at the path specified
desc "Create a new page."
task :page do
  name = ENV["name"] || "new-page.md"
  filename = File.join(SOURCE, "#{name}")
  filename = File.join(filename, "index.html") if File.extname(filename) == ""
  title = File.basename(filename, File.extname(filename)).gsub(/[\W\_]/, " ").gsub(/\b\w/){$&.upcase}
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  
  mkdir_p File.dirname(filename)
  puts "Creating new page: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: page"
    post.puts "title: \"#{title}\""
    post.puts 'description: ""'
    post.puts "---"
    post.puts "{% include JB/setup %}"
  end
end # task :page

desc "Launch preview environment"
task :preview do
  system "jekyll --auto --server --limit_posts 50"
end # task :preview

def ask(message, valid_options)
  if valid_options
    answer = get_stdin("#{message} #{valid_options.to_s.gsub(/"/, '').gsub(/, /,'/')} ") while !valid_options.include?(answer)
  else
    answer = get_stdin(message)
  end
  answer
end

def get_stdin(message)
  print message
  STDIN.gets.chomp
end

# Gives the name of the next to-be-used image.
def next_image layout
  number = last_used(layout)+1
  imagefile = File.join(CONFIG["images_templates"], "#{layout}-#{number}.png")
  imagefile if File.exists?(imagefile)
end

# Same as next_image, but increments the pointer.
def next_image! layout
  image = next_image layout
  if image
    inc_last_used! layout
  end
  image
end

# Finds the last used image of a certain layout.
def inc_last_used! layout
  number = last_used layout
  set_last_used number+1, layout
end

# Finds the last used imagenumber of a certain layout.
def last_used layout
  number = "0"
  filename = File.join(CONFIG["images_templates"], "last_#{layout}")

  if File.exists?(filename)
    number = File.open(filename, 'r').readline || number
  else
    last_used = number
  end

  number.to_i
end
# sets the last used image.
def set_last_used number, layout
  filename = File.join(CONFIG["images_templates"], "last_#{layout}")
  File.open(filename, 'w') do |pointer|
    pointer.puts number
  end
end
