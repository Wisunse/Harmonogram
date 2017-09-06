class App
  def check_login!
    halt 401 unless session[:authenticated]
  end

  get '/' do
    if session[:authenticated]
      redirect '/authenticated'
    else
      redirect '/login'
    end
  end

  get '/login' do
    if session[:authenticated]
      redirect '/authenticated'
    else
      erb :main
    end
  end

  get '/authenticated' do
    if session[:authenticated]
      erb :main
    else
      redirect '/login'
    end
  end

  get '/views/public/:view' do
    case params[:view]
    when 'login'
      erb :login, layout: false
    else
      erb :error_404, layout: false
    end
  end

  get '/views/protected/:view' do
    if session[:authenticated]
      case params[:view]
      when 'menu'
        erb :menu, layout: false
      when 'management'
        erb :management, layout: false
      when 'users'
        erb :users, layout: false
      when 'cars'
        erb :cars, layout: false
      else
        erb :error_404, layout: false
      end
    else
      redirect '/login'
    end
  end

  get '/views/dialog/:view' do
    if session[:authenticated]
      case params[:view]
        when 'edit_user'
          erb :'dialog/edit_user', layout: false
        when 'add_new_user'
          erb :'dialog/add_new_user', layout: false
        when 'add_new_car'
          erb :'dialog/add_new_car', layout: false
        when 'edit_car'
          erb :'dialog/edit_car', layout: false
        when 'management_details'
          erb :'dialog/management_details', layout: false
        else
          erb :error_404, layout: false
      end
    else
      redirect '/login'
    end
  end

  get '/is_loggin' do
    { loggin: session[:authenticated], data: session[:user_data] }.to_json
  end

  post '/try_login' do
    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
    result = Authentication.authentication(params)
    if result != '-1' && result != '-2' && result != '-3'
      session[:authenticated] = true
      session[:user_data] = result
      response = { status: '1', authentication: session[:authenticated] }
    else
      session[:authenticated] = false
      session[:user_data] = nil
      response = { status: result, authentication: session[:authenticated] }
    end
    response.to_json
  end

  get '/all_users' do
    Users.all_users.to_json
  end

  get '/all_cars' do
    Cars.all_cars.to_json
  end

  get '/all_registry' do
    Registry.all_registry.to_json
  end

  get '/dates_now' do
    Registry.dates_now.to_json
  end



  post '/new_user' do
    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
    Users.new_user(params[:user]).to_json
  end

  post '/edit_user' do
    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
    Users.edit_user(params[:user]).to_json
  end

  post '/delete_user' do
    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
    Users.delete_user(params[:user]).to_json
  end

  post '/new_car' do
    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
    Cars.new_car(params[:car]).to_json
  end

  post '/edit_car' do
    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
    Cars.edit_car(params[:car]).to_json
  end

  post '/month_info' do
    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
    Registry.month_info(params).to_json
  end

  post '/new_register' do
    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
    Registry.new_register(params[:pickedDay]).to_json
  end

  get '/log_out' do
    [:authenticated, :user_data].each { |k| session.delete(k) }
    redirect '/login'
  end

  put '/*' do
    erb :error_404
  end

  delete '/*' do
    erb :error_404
  end

  post '/*' do
    erb :error_404
  end

  get '/*' do
    erb :error_404
  end
end