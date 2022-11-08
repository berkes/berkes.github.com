require "rubygems"
require 'rake'
require 'yaml'
require 'time'
require 'fileutils'
require 'jekyll'

SOURCE = "./src"
CONFIG = {
  'version' => "0.2.13",
  'posts' => File.join(SOURCE, "_posts"),
  'images' => File.join(SOURCE, "images"),
  'images_templates' => File.join(SOURCE, "_images_templates"),
  'post_ext' => "markdown",
  'editor' => 'nvim',
  'build_dir' => "./build"
}

# Path configuration helper
module JB
  class Path
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
desc "Begin a new post in #{CONFIG['posts']} [lang=(en|nl)][date=YYYY-mm-dd][title=TITLE]"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  abort("rake aborted: 'ENV['title']' is not set. Consider title='my title'") unless ENV.key?('title')

  lang = ENV['lang'] || 'en'

  title = ENV['title']
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
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts "tags: []"
    post.puts "lang: #{lang}"
    post.puts "---"
  end

  imagefile = File.join(CONFIG['images'], now.year.to_s, "%02d" % now.month, "%02d" % now.day, "#{slug}.png");
  if File.exists?(imagefile)
    abort("rake aborted!") if ask("#{imagefile} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  template_imagefile = next_image!
  puts "Copying image: #{template_imagefile} to #{imagefile}"
  mkdir_p File.dirname(imagefile)
  FileUtils.copy(template_imagefile, imagefile)

  system "#{CONFIG['editor']} #{filename}"
end # task :post

desc "Launch preview environment"
task :preview do
  limit = ENV["limit"] || 20
  system "jekyll serve --watch --limit-posts #{limit} --destination #{CONFIG['build_dir']} --source  #{SOURCE}"
end # task :preview

desc "List tags used"
task "tags:graph" do
  jekyll = Jekyll::Site.new(Jekyll.configuration({}))
  jekyll.read_posts('')
  tags = {}
  jekyll.posts.each do |post|
    post.tags.each {|t| tags.has_key?(t) ? tags[t] += 1 : tags[t] = 1 }
  end

  tags.sort_by{|k,v| v }.each do |tag|
    (20 - tag[0].to_s.size).times { print " " }
    print "#{tag[0].to_s.slice(0,20)}: "
    tag[1].times { print "#"}
    print "#{tag[1]}\n"
  end
end

desc "Remove a tag name=tagname"
task "tags:remove" do
  clean_posts = []
  jekyll = Jekyll::Site.new(Jekyll.configuration({}))
  jekyll.read_posts('')
  jekyll.posts.select {|p| p.tags.include? ENV['name'] }.each do |post|
    post.tags.reject! {|t| t == ENV['name']}
    clean_posts << post
  end
  clean_posts.each{|p| puts "#{p.slug} #{p.tags.join(',')}"}
end

desc "Build site in #{CONFIG["build_dir"]}"
task "build" do
  FileUtils.mkdir_p(CONFIG["build_dir"]) unless File.exists? CONFIG["build_dir"]
  system "jekyll build --destination #{CONFIG["build_dir"]} --source  #{SOURCE}"
end

desc "Publish to production"
task publish: :build do
  system "cap production deploy"
end

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
def next_image(layout)
  number = last_used(layout)+1
  imagefile = File.join(CONFIG["images_templates"], "#{layout}-#{number}.png")
  imagefile if File.exists?(imagefile)
end

def first_image(layout)
  glob = File.join(CONFIG["images_templates"], "#{layout}-*.png")
  Dir[glob][0]
end

# Same as next_image, but increments the pointer.
def next_image!(layout="portrait")
  if image = next_image(layout)
    inc_last_used!(layout)
    image
  else
    set_last_used(0, layout)
    first_image(layout)
  end
end

# Finds the last used image of a certain layout.
def inc_last_used!(layout)
  number = last_used layout
  set_last_used(number+1, layout)
end

# Finds the last used imagenumber of a certain layout.
def last_used(layout)
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
def set_last_used(number, layout)
  filename = File.join(CONFIG["images_templates"], "last_#{layout}")
  File.open(filename, 'w') do |pointer|
    pointer.puts number
  end
end
