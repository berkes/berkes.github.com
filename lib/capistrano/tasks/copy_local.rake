namespace :copy_local do
  desc "Check if prerequisites for local_copy are in order"
  task :check do
  end

  desc "Perform the actual deployment"
  task :create_release do
    on release_roles :all do
      # Create the release directory, but not the destination directory,
      # otherwised we'd scp the local directory itself into the destination
      # directory, rather than the contents of that directory.
      destination_parent = File.dirname(fetch(:copy_local_destination_path))
      execute(:mkdir, "-p", destination_parent)
      upload! fetch(:copy_local_source_path),
              fetch(:copy_local_destination_path),
              recursive: true
    end
  end
end
