namespace :copy_local do
  desc "Check if prerequisites for local_copy are in order"
  task :check do
  end

  desc "Perform the actual deployment"
  task :create_release do
    on release_roles :all do |role|
      # Copy to remote cache using rsync
      run_locally do
        rsync_options = %w[--recursive --delete --relative]
        rsync_options << '--dry-run' if dry_run?
        execute :rsync,
          rsync_options,
          fetch(:copy_local_source_path),
          "#{role.user}@#{role.hostname}:#{repo_path}"
      end

      # Create the release directory, but not the destination directory,
      # otherwised we'd scp the local directory itself into the destination
      # directory, rather than the contents of that directory.
      destination_parent = File.dirname(fetch(:copy_local_destination_path))
      execute(:mkdir, "-p", destination_parent)
      execute(:cp, '--recursive', File.join(repo_path, fetch(:copy_local_source_path)), fetch(:copy_local_destination_path))
    end
  end
end
