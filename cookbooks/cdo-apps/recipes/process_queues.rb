poise_service 'process_queues' do
  command "bundle exec bin/sqs/process_queues config/queue_config.json.erb"
  user node[:user]
  directory "#{root}/dashboard"
end
