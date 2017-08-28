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
      else
        erb :error_404, layout: false
      end
    else
      redirect '/login'
    end
  end

  # get '/views/modal/:view' do
  #   if session[:authenticated]
  #     case params[:view]
  #     when 'add_new_item'
  #       erb :'modal/add_new_item', layout: false
  #     when 'add_to_item'
  #       erb :'modal/add_to_item', layout: false
  #     when 'give_item'
  #       erb :'modal/give_item', layout: false
  #     when 'add_new_beneficiary'
  #       erb :'modal/add_new_beneficiary', layout: false
  #     when 'edit_item'
  #       erb :'modal/edit_item', layout: false
  #     when 'edit_beneficiary'
  #       erb :'modal/edit_beneficiary', layout: false
  #     when 'add_new_target'
  #       erb :'modal/add_new_target', layout: false
  #     when 'edit_target'
  #       erb :'modal/edit_target', layout: false
  #     when 'show_target_details'
  #       erb :'modal/show_target_details', layout: false
  #     when 'history_edit'
  #       erb :'modal/history_edit', layout: false
  #     else
  #       erb :error_404, layout: false
  #     end
  #   else
  #     redirect '/login'
  #   end
  # end

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