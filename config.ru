# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment',  __FILE__)
run Rails.application

require 'rack/cors'
use Rack::Cors do
  allow do
    origins 'localhost:9000'
    resource '*', :headers => :any, :methods => [:get, :post, :options, :delete]
  end
end