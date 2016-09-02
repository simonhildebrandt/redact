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
      return config_response if request.path_info == '/config.json'
      [404, {}, []]
    end

    def index_response
      [200, {'Content-Type' => 'text/html'}, [index_page]]
    end

    def config_response
      [200, {'Content-Type' => 'application/json'}, [config_data]]
    end

    def config_data
      JSON.dump(path_data.merge(models: model_data))
    end

    def path_data
      {login_path: '/login', logout_path: '/logout', user_path: '/user'}
    end

    def model_data
      [
        { name: 'books', label: 'Books', fields: [
          { name: 'id', type: 'string', primary: true },
          { name: 'name', type: 'string' },
          { name: 'author_id', type: 'association', associated: 'author' }
        ]},
        { name: 'authors', label: 'Authors', fields: [
          { name: 'id', type: 'string', primary: true }, { name: 'name', type: 'string' }
        ]}
      ]
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
    Rack::Builder.new do
      map Redact.admin_path do
        run Rack::Cascade.new [
          Redact::Index.new,
          Rack::File.new('public'),
        ]
      end
    end
  end
end
