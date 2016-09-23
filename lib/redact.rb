require "rack/builder"

class Redact
  def self.admin_path
    '/admin'
  end

  def initialize(app)
    @stack = Rack::Builder.new(app) do
      map Redact.admin_path do
        use Redact::Index
        use Rack::Static, :urls => ["/"], :root => "public"
      end
    end
  end

  def call(env)
    @stack.call(env)
  end

  class Index
    def initialize(app)
      @app = app
    end

    def call env
      request = Rack::Request.new env
      return index_response if root_paths.include? request.path_info
      return config_response if request.path_info == '/config.json'
      @app.call(env)
    end

    def index_response
      [200, {'Content-Type' => 'text/html'}, [index_page]]
    end

    def config_response
      [200, {'Content-Type' => 'application/json'}, [JSON.dump(config_data)]]
    end

    def config_data
      path_data.merge(models: model_data)
    end

    def path_data
      {login_path: '/login', logout_path: '/logout', user_path: '/user'}
    end

    def model_data
      [
        { name: 'authors', label: 'Authors', fields: [
          { name: 'id', label: 'ID', type: 'string', primary: true },
          { name: 'name', label: 'Name', type: 'string' }
        ]},
        { name: 'books', label: 'Books', fields: [
          { name: 'id', label: 'ID', type: 'string', primary: true },
          { name: 'name', label: 'Name', type: 'string' },
          { name: 'author_id', label: 'Author', type: 'association', associated: 'author' }
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
end
