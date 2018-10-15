require 'rubygems'
require 'sequel'
require 'fileutils'
require 'yaml'

require File.join(File.dirname(__FILE__), "downmark_it")

# NOTE: This converter requires Sequel and the MySQL gems.
# The MySQL gem can be difficult to install on OS X. Once you have MySQL
# installed, running the following commands should work:
# $ sudo gem install sequel
# $ sudo gem install mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config

module Jekyll
  module Drupal
    # Reads a MySQL database via Sequel and creates a post file for each post
    # in wp_posts that has post_status = 'publish'. This restriction is made
    # because 'draft' posts are not guaranteed to have valid dates.
    QUERY = "SELECT n.nid,
                    n.title,
                    nr.body,
                    n.created,
                    n.status,
                    nr.format,
                    td.name as tag
             FROM node AS n
             INNER JOIN node_revisions AS nr ON nr.vid = n.vid
             LEFT JOIN term_node AS tn ON tn.nid = n.nid
             LEFT JOIN term_data AS td ON td.tid = tn.tid
             WHERE (n.type = 'blog' OR n.type = 'story')"
    # QUERY = "SELECT n.nid, \
    #                 n.title, \
    #                 nr.body, \
    #                 n.created, \
    #                 n.status \
    #          FROM node AS n, \
    #               node_revisions AS nr \
    #          WHERE (n.type = 'blog' OR n.type = 'story') \
    #          AND n.vid = nr.vid "

    def self.process(dbname, user, pass, host = 'localhost', prefix = '', lang = '')
      db = Sequel.mysql(dbname, :user => user, :password => pass, :host => host, :encoding => 'utf8')

      if prefix != ''
        QUERY[" node "] = " " + prefix + "node "
        QUERY[" node_revisions "] = " " + prefix + "node_revisions "
      end

      FileUtils.mkdir_p "_posts"
      FileUtils.mkdir_p "_drafts"

      # Create the refresh layout
      # Change the refresh url if you customized your permalink config
      File.open("_layouts/refresh.html", "w") do |f|
        f.puts <<EOF
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta http-equiv="refresh" content="0;url={{ page.refresh_to_post_id }}.html" />
</head>
</html>
EOF
      end

      # Loop over results and group the tags.
      posts = {}
      db[QUERY].each do |post|
        if posts.has_key? post[:nid]
          posts[post[:nid]][:tags] << post[:tag]
        else
          post[:tags] = [post[:tag]]
          posts[post[:nid]] = post
        end
      end

      posts.each do |nid, post|
        # Get required fields and construct Jekyll compatible name
        #
        node_id = post[:nid]
        title = post[:title]
        case post[:format]
        when 4
          content = post[:body]
        else
          content = DownmarkIt.to_markdown post[:body]
        end
        created = post[:created]
        time = Time.at(created)
        tags = post[:tags].map {|t| t.to_s.force_encoding("UTF-8") } unless post[:tags].empty?
        is_published = post[:status] == 1
        dir = is_published ? "_posts" : "_drafts"
        slug = title.strip.downcase.gsub(/(&|&amp;)/, ' and ').gsub(/[\s\.\/\\]/, '-').gsub(/[^\w-]/, '').gsub(/[-_]{2,}/, '-').gsub(/^[-_]/, '').gsub(/[-_]$/, '')
        name = time.strftime("%Y-%m-%d-") + slug + '.md'

        # Get the relevant fields as a hash, delete empty fields and convert
        # to YAML for the header
        data = {
           'layout' => 'post_archive',
           'title' => title.to_s.force_encoding("UTF-8"),
           'created' => created,
           'tags' => tags,
           'lang' => lang,
         }.delete_if { |k,v| v.nil? || v == ''}.to_yaml

        # Write out the data and content to file
        # unless File.exists?("#{dir}/#{name}")
          File.open("#{dir}/#{name}", "w") do |f|
            f.puts data
            f.puts "---"
            f.puts content
          end
        # end

        # Make a file to redirect from the old Drupal URL
        if is_published
          aliases = db["SELECT dst FROM #{prefix}url_alias WHERE src = ?", "node/#{node_id}"].all

          aliases.push(:dst => "node/#{node_id}")

          aliases.each do |url_alias|
            full_alias = "redirects/#{lang}/#{url_alias[:dst]}"
            FileUtils.mkdir_p full_alias
            File.open("#{full_alias}/index.md", "w") do |f|
              f.puts "---"
              f.puts "layout: refresh"
              f.puts "refresh_to_post_id: /#{time.strftime("%Y/%m/%d/") + slug}"
              f.puts "---"
            end
          end
        end
      end

      # TODO: Make dirs & files for nodes of type 'page'
        # Make refresh pages for these as well

      # TODO: Make refresh dirs & files according to entries in url_alias table
    end
  end
end
