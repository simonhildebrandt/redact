require 'rack/cors'
require 'rack/builder'
require 'grape'


$LOAD_PATH.unshift File.expand_path("../lib", __FILE__)
require 'redact'


class API < Grape::API
  prefix :data
  
  resource :books do
    post :login do



use Rack::Cors do
  allow do
    origins '*'
    resource '*', :headers => :any, :methods => [:get, :post, :delete, :options]
  end
end

class DummyApp
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
    [404, {}, []]
  end

  def html_for
    [200, {'Content-Type' => 'text/html'}, [yield]]
  end

  def login_page(env, request)
    "<html><body>#{logout_link(env)}<form method='post' action='/login'><input type='hidden' name='redirect_to' value='#{request.params['redirect_to']}'/><input type='text' name='username'/> <button type='submit'>Login</button></form></body></html>"
  end

  def logout_link env
    if env['rack.session']['username']
      "<a href='/logout'>#{env['rack.session']['username']}</a>"
    end
  end
end

use Rack::Session::Cookie
run Rack::Cascade.new [DummyApp.new, Redact.app]
