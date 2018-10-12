# Load DSL and set up stages
require "capistrano/setup"

# Include default deployment tasks
require "capistrano/deploy"

# The copy-local plugiun to deploy static builds
require "./lib/capistrano/scm/copy_local.rb"
install_plugin Capistrano::SCM::CopyLocal

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
