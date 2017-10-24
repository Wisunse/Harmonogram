require 'sinatra/base'
require 'rubygems'
require 'bundler'
require 'encrypted_cookie'
require 'json'
require 'puma'
require 'pg'
require 'sinatra'
# require 'rubocop', require: false

require './config/init'

class App < Sinatra::Application
  configure :development do
    set server: 'puma'
    set bind: '0.0.0.0'
    set port: 81
  end
  configure :production do
    set bind: '0.0.0.0'
    set port: 80
  end
  use Rack::Session::EncryptedCookie,
      secret: '6f4d0c5a9dec92e6c68293f5cdff5f76dae3c8fd498ad5815638c9d448723'
  require_relative 'models/init'
  require_relative 'routes/init'

end
