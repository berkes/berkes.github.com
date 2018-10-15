require "capistrano/scm/plugin"

class Capistrano::SCM::CopyLocal < Capistrano::SCM::Plugin
  def set_defaults
    set_if_empty :copy_local_source_path, "./build/"
    set_if_empty :copy_local_destination_path, lambda {
      File.join(release_path, "public")
    }
  end

  def register_hooks
    after "deploy:new_release_path", "copy_local:create_release"
    before "deploy:check", "copy_local:check"
  end

  def define_tasks
    eval_rakefile File.expand_path("../../tasks/copy_local.rake", __FILE__)
  end
end
