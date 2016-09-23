require 'rack/cors'
require 'rack/builder'
require 'grape'
require 'grape-swagger'


$LOAD_PATH.unshift File.expand_path("../lib", __FILE__)
require 'redact'

$authors = [{ id: SecureRandom.uuid, name: 'Simon Hildebrandt' }]
$books = [{ id: SecureRandom.uuid, name: 'Websters Unite', author_id: $authors[0][:id] }]

class DummyAPI < Grape::API
  [:author, :book].each do |singular|

    plural = "#{singular}s"

    helpers do
      def books
        $books
      end
      def authors
        $authors
      end

      define_method "#{singular}_by_id" do |id|
        send(plural).select {|r| r[:id] == id }[0]
      end
      define_method "delete_#{singular}" do |id|
        send(plural).reject! {|r| r[:id] == id }
      end
      define_method "create_#{singular}" do |**attrs|
        send(plural) << attrs
      end
    end

    puts "adding #{plural} resource"
    resource plural do
      get do
        send(plural)
      end
      get ':id' do
        send("#{singular}_by_id", params['id']) || error!(:not_found, 404)
      end
      delete ':id' do
        send("delete_#{singular}", params['id'])
      end

      params do
        requires :name, type: String
      end
      post do
        send("create_#{singular}", id: SecureRandom.uuid, name: params['name'])
      end

      params do
        requires :name, type: String
      end
      put ':id' do
        send(plural)[:name] = params['name']
      end
    end
  end
end

module API
  class Root < Grape::API
    format :json

    mount DummyAPI
    add_swagger_documentation
  end
end

class DummyApp
  def initialize(app)
    @app = app
  end

  def call env
    request = Rack::Request.new env
    if request.path_info == '/login'
      if request.request_method == 'GET'
        return html_for { login_page(env, request) }
      elsif request.request_method == 'POST'
        env['rack.session']['username'] = request.params['username']
        return [302, {'Location' => request.params['redirect_to'] || '/login'}, []]
      end
    elsif request.path_info == '/logout'
      env['rack.session'].delete('username')
      return [302, {'Location' => request.params['redirect_to'] || '/login'}, []]
    elsif request.path_info == '/user'
      if env['rack.session']['username']
        return [200, {'Content-Type' => 'application/json'}, [JSON.dump(username: env['rack.session']['username'])]]
      else
        return [403, {}, []]
      end
    end
    @app.call(env)
  end

  def html_for
    [200, {'Content-Type' => 'text/html'}, [yield]]
  end

  def login_page(env, request)
    <<-END
    <html><body>#{logout_link(env)}
    <form method='post' action='/login'>
      <input type='hidden' name='redirect_to' value='#{request.params['redirect_to']}'/>
      <input type='text' name='username'/>
      <button type='submit'>Login</button>
    </form></body></html>
    END
  end

  def logout_link env
    if env['rack.session']['username']
      "<a href='/logout'>#{env['rack.session']['username']}</a>"
    end
  end
end


use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:put, :get, :post, :delete, :options]
  end
end
use Rack::Session::Cookie, secret: 'change_me'
use DummyApp
use Redact
run API::Root
