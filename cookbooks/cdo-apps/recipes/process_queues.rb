poise_service 'process_queues' do
  root = File.join node[:home], node.chef_environment
  dashboard_root = File.join root, 'dashboard'

  command "bundle exec bin/sqs/process_queues config/queue_config.json.erb"
  user node[:user]
  directory dashboard_root
end
