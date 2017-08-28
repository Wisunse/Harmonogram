require 'rubygems'
require 'bundler'

Bundler.require

#\ -s puma -o 0.0.0.0 -p 3000 -E development
#\ -s puma -o 0.0.0.0 -p 3000 -E production

require File.join(File.dirname(__FILE__), 'app.rb')
run App.new
