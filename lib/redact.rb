require "rack/builder"

module Redact
  def self.admin_path
    '/admin'
  end

  class Index
    def call env
      request = Rack::Request.new env
      #require 'byebug'; byebug
      return index_response if root_paths.include? request.path_info
      [404, {}, []]
    end

    def index_response
      [200, {'Content-Type' => 'text/html'}, [index_page]]
    end

    def index_page
      File.read(index_path).gsub('TITLE', 'Redact').gsub('PATH', Redact.admin_path)
    end

    def index_path
      File.expand_path '../../assets/index.html', __FILE__
    end

    def root_paths
      ['', '/']
    end
  end

  def self.app
    path = admin_path
    Rack::Builder.new do
      map '/admin' do
        run Rack::Cascade.new [
          Redact::Index.new,
          Rack::File.new('public'),
        ]
      end
    end
  end
end
