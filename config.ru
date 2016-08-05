require 'grape'
require 'grape-swagger'
require 'rack/cors'

$LOAD_PATH.unshift File.expand_path("../lib", __FILE__)
require 'redact'


module Redact
  class API < Grape::API
    resource :other do
      desc 'Example utilities'
      post :login do
        Thread.current[:user] = 'Simon'
      end
      delete :logout do
        Thread.current[:user] = nil
      end
    end
    resource :redact do
      desc 'Redact utilities'
      get :user do
        if Thread.current[:user]
          { username: Thread.current[:user] }
        else
          status 403
        end
      end
      get :models do
        [
          { name: 'books', fields: [
            { name: 'id', type: 'string', primary: true },
            { name: 'name', type: 'string' },
            { name: 'author_id', type: 'association', associated: 'author' }
          ]},
          { name: 'authors', fields: [ { name: 'id', type: 'string', primary: true }, { name: 'name', type: 'string' } ] }
        ]
      end
    end
  end
end

module API
  class Root < Grape::API
    format :json
    mount Redact::API
    add_swagger_documentation
  end
end

use Rack::Cors do
  allow do
    origins 'http://swagger-ui.fairfax.com.au'
    resource '*', :headers => :any, :methods => [:get, :post, :delete, :options]
  end
end

run Rack::Cascade.new [API::Root.new, Redact.app]
